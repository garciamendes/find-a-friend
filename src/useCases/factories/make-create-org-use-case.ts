// Third party
import { PrismaAccountRepository } from '../../repositories/prisma/prisma-account-repository'
import { PrismaOrgRepository } from '../../repositories/prisma/prisma-org-repository'
import { CreateOrgUseCase } from '../create-org'

export function makeCreateOrgUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const accountRepository = new PrismaAccountRepository()
  const createOrgUseCase = new CreateOrgUseCase(
    orgRepository,
    accountRepository,
  )

  return createOrgUseCase
}
