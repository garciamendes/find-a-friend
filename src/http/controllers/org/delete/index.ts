// Third part
import { FastifyRequest, FastifyReply } from 'fastify'
import { z as zod } from 'zod'

// Project
import { makeDeleteOrgUseCase } from '../../../../useCases/factories/make-delete-org-use-case'
import { OrgNotExistsError } from '../../../../useCases/errors/org-not-exists.error'

export async function deleteOrg(request: FastifyRequest, reply: FastifyReply) {
  const orgIdParams = zod.object({
    org_id: zod.string().uuid(),
  })

  try {
    const { org_id } = orgIdParams.parse(request.params)

    const deleteUseCase = makeDeleteOrgUseCase()
    await deleteUseCase.execute(org_id)
  } catch (error) {
    if (error instanceof OrgNotExistsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }

  return reply.status(204).send()
}
