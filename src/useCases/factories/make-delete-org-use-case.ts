// Third party
import { PrismaOrgRepository } from '../../repositories/prisma/prisma-org-repository'
import { DeleteOrgUseCase } from '../delete-org'

export function makeDeleteOrgUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const deleteOrgUseCase = new DeleteOrgUseCase(orgRepository)

  return deleteOrgUseCase
}
