// Third party
import { FastifyReply, FastifyRequest } from 'fastify'
import { z as zod } from 'zod'

// Project
import { makeAuthenticateUseCase } from '../../../../useCases/factories/make-authenticate-use-case'
import { InvalidCrendetialsError } from '../../../../useCases/errors/invalid-crendetials.error'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createBody = zod.object({
    email: zod.string().email(),
    password: zod.string(),
  })

  const { email, password } = createBody.parse(request.body)

  try {
    const authenticateAccountUseCase = makeAuthenticateUseCase()
    const { account } = await authenticateAccountUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: { sub: account.id },
      },
    )
    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: { sub: account.id, expiresIn: '7d' },
      },
    )

    return reply
      .status(200)
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send({ Token: token })
  } catch (error) {
    if (error instanceof InvalidCrendetialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
