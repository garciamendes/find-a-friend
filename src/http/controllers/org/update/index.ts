// Third party
import { FastifyReply, FastifyRequest } from 'fastify'
import { z as zod } from 'zod'

// Project
import { ResourceNotFoundError } from '../../../../useCases/errors/resource-not-found-error'
import { makeUpdateOrgUseCase } from '../../../../useCases/factories/make-update-org-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  // const updateOrgBody = zod.object({
  //   name: zod.string().nullable(),
  //   name_org: zod.string().nullable(),
  //   cep: zod.string().nullable(),
  //   street_number: zod.number().nullable(),
  //   neighborhood: zod.string().nullable(),
  //   city: zod.string().nullable(),
  //   state: zod.string().nullable(),
  //   address: zod.string().nullable(),
  //   whatsapp: zod.string().nullable(),
  // })

  const orgIdParams = zod.object({
    org_id: zod.string().uuid(),
  })

  try {
    const data = request.body as any
    const { org_id } = orgIdParams.parse(request.params)

    const orgUseCase = makeUpdateOrgUseCase()
    const { org } = await orgUseCase.execute({
      org_id,
      data,
    })

    return reply.status(200).send(org)
  } catch (error) {
    if (error instanceof ResourceNotFoundError)
      return reply.status(401).send({ message: error.message })

    throw error
  }
}
