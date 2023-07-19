// Node
import { randomUUID } from 'node:crypto'

// Third party
import { Account, Prisma } from '@prisma/client'

// Project
import { IAccountRepository } from '../account-repository'

export class InMemoryAccountRepository implements IAccountRepository {
  public items: Account[] = []

  async create(data: Prisma.AccountCreateInput) {
    const account = {
      id: randomUUID(),
      email: data.email,
      password_hash: data.password_hash,
    }

    this.items.push(account)
    return account
  }

  async findByEmail(email: string) {
    const account = this.items.find((account) => account.email === email)

    if (!account) return null

    return account
  }

  async findById(id: string) {
    const account = this.items.find((account) => account.id === id)

    if (!account) return null

    return account
  }
}
