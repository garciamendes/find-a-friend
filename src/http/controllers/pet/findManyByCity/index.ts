// Third part
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFindManyByCityPetUseCase } from '../../../../useCases/factories/make-find-many-by-city-pet-use-case'

// Project

export async function findManyByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findByIdQuery = z.object({
    city: z.string(),
  })

  const { city } = findByIdQuery.parse(request.query)

  const findManyBYCityPetUseCase = makeFindManyByCityPetUseCase()
  const { pets } = await findManyBYCityPetUseCase.execute(city)

  return reply.status(200).send({ pets })
}
