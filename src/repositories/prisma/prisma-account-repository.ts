// Third party
import { Prisma } from '@prisma/client'

// Project
import { prisma } from '../../lib/prisma'
import { IAccountRepository } from '../account-repository'

export class PrismaAccountRepository implements IAccountRepository {
  async create(data: Prisma.AccountCreateInput) {
    const account = await prisma.account.create({
      data,
    })

    return account
  }

  async findByEmail(email: string) {
    const account = await prisma.account.findUnique({
      where: { email },
    })
    return account
  }

  async findById(id: string) {
    const account = await prisma.account.findUnique({
      where: { id },
    })

    return account
  }
}
