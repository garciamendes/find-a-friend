// Third part
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFindByIdPetUseCase } from '../../../../useCases/factories/make-find-by-id-pet-use-case'

// Project

export async function findById(request: FastifyRequest, reply: FastifyReply) {
  const findByIdParams = z.object({
    pet_id: z.string().uuid(),
  })

  const { pet_id } = findByIdParams.parse(request.params)

  const findByIdPetUseCase = makeFindByIdPetUseCase()
  const { pet } = await findByIdPetUseCase.execute(pet_id)

  return reply.status(200).send({ pet })
}
