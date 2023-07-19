// Third party
import { FastifyReply, FastifyRequest } from 'fastify'
import { z as zod } from 'zod'
import { AccountAlreadyExistsError } from '../../../../useCases/errors/account-already-exists-error'
import { PasswordNotMatchError } from '../../../../useCases/errors/password-not-match-error'
import { makeCreateAccountUseCase } from '../../../../useCases/factories/make-create-account-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBody = zod.object({
    email: zod.string().email(),
    password: zod.string(),
    confirmation_password: zod.string(),
  })

  const { email, password, confirmation_password } = createBody.parse(
    request.body,
  )

  try {
    const createAccountUseCase = makeCreateAccountUseCase()

    await createAccountUseCase.execute({
      email,
      password,
      confirmation_password,
    })
  } catch (error) {
    if (error instanceof AccountAlreadyExistsError)
      return reply.status(409).send({ message: error.message })

    if (error instanceof PasswordNotMatchError)
      return reply.status(401).send({ message: error.message })

    throw error
  }

  return reply.status(201).send()
}
