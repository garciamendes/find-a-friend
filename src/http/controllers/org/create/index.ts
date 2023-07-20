// Third party
import { FastifyReply, FastifyRequest } from 'fastify'
import { z as zod } from 'zod'

// Project
import { makeCreateOrgUseCase } from '../../../../useCases/factories/make-create-org-use-case'
import { OrgAlreadyExistsError } from '../../../../useCases/errors/org-already-exists-error'
import { ResourceNotFoundError } from '../../../../useCases/errors/resource-not-found-error'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBody = zod.object({
    name: zod.string(),
    name_org: zod.string(),
    cep: zod.string(),
    street_number: zod.number(),
    neighborhood: zod.string(),
    city: zod.string(),
    state: zod.string(),
    address: zod.string(),
    whatsapp: zod.string(),
  })

  try {
    const {
      name,
      name_org,
      address,
      street_number,
      city,
      state,
      cep,
      neighborhood,
      whatsapp,
    } = createOrgBody.parse(request.body)

    const orgUseCase = makeCreateOrgUseCase()
    const account_id = request.user.sub
    await orgUseCase.execute({
      name,
      name_org,
      address,
      street_number,
      city,
      state,
      cep,
      neighborhood,
      whatsapp,
      account_id,
    })
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError)
      return reply.status(409).send({ message: error.message })

    if (error instanceof ResourceNotFoundError)
      return reply.status(401).send({ message: error.message })

    throw error
  }

  return reply.status(201).send()
}
