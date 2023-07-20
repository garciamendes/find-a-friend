// Third party
import { FastifyReply, FastifyRequest } from 'fastify'
import { z as zod } from 'zod'
import {
  Age,
  Environment,
  LevelEnergy,
  LevelIndependence,
  TypePet,
} from '@prisma/client'

// Project
import { ResourceNotFoundError } from '../../../../useCases/errors/resource-not-found-error'
import { makeCreatePetUseCase } from '../../../../useCases/factories/make-create-pet-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBody = zod.object({
    name: zod.string(),
    description: zod.string(),
    age: zod.enum([Age.CUB, Age.ADULT]),
    type: zod.enum([TypePet.LITTLE, TypePet.MENDIUM, TypePet.BIG]),
    levelEnergy: zod.enum([
      LevelEnergy.LITTLE,
      LevelEnergy.MENDIUM,
      LevelEnergy.BIG,
    ]),
    levelIndependence: zod.enum([
      LevelIndependence.LITTLE,
      LevelIndependence.MENDIUM,
      LevelIndependence.BIG,
    ]),
    environment: zod.enum([Environment.OPENED, Environment.WIDE_OPENED]),
    images: zod.any(),
    requirementsAdoption: zod.any(),
    org_id: zod.string().uuid(),
  })

  try {
    const {
      age,
      description,
      environment,
      levelEnergy,
      levelIndependence,
      requirementsAdoption,
      name,
      type,
      org_id,
    } = createPetBody.parse(request.body)

    // uploaded
    const images_urls = []
    for await (const file of request.files) {
      images_urls.push(file.path)
    }

    const createPetUseCase = makeCreatePetUseCase()
    await createPetUseCase.execute({
      age,
      description,
      environment,
      images_urls,
      levelEnergy,
      levelIndependence,
      requirementsAdoption,
      name,
      type,
      org_id,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError)
      return reply.status(401).send({ message: error.message })

    throw error
  }

  return reply.status(201).send()
}
