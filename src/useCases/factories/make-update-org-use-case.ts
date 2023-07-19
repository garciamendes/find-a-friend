// Third party
import { PrismaOrgRepository } from '../../repositories/prisma/prisma-org-repository'
import { UpdateOrgUseCase } from '../update-org'

export function makeUpdateOrgUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const updateOrgUseCase = new UpdateOrgUseCase(orgRepository)

  return updateOrgUseCase
}
