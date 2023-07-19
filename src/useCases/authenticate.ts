// Third party
import { compare } from 'bcryptjs'
import { Account } from '@prisma/client'

// Project
import { IAccountRepository } from '../repositories/account-repository'
import { InvalidCrendetialsError } from './errors/invalid-crendetials.error'

interface IAuthenticateAccount {
  email: string
  password: string
}

interface IAuthenticateAccountUseCase {
  account: Account
}

export class AuthenticateAccountUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute({
    email,
    password,
  }: IAuthenticateAccount): Promise<IAuthenticateAccountUseCase> {
    const account = await this.accountRepository.findByEmail(email)

    if (!account) throw new InvalidCrendetialsError()

    const doesPasswordMatch = await compare(password, account.password_hash)
    if (!doesPasswordMatch) throw new InvalidCrendetialsError()

    return { account }
  }
}
