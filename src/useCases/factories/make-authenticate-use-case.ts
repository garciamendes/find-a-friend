// Third party
import { AuthenticateAccountUseCase } from '../authenticate'
import { PrismaAccountRepository } from '../../repositories/prisma/prisma-account-repository'

export function makeAuthenticateUseCase() {
  const accountRepository = new PrismaAccountRepository()
  const authenticateUseCase = new AuthenticateAccountUseCase(accountRepository)

  return authenticateUseCase
}
