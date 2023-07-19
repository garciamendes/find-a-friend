// Third party
import { Prisma, Account } from '@prisma/client'

export interface IAccountRepository {
  create: (data: Prisma.AccountCreateInput) => Promise<Account>
  findByEmail: (email: string) => Promise<Account | null>
  findById: (id: string) => Promise<Account | null>
}
