// Third party
import { Account } from '@prisma/client'

// Project
import { IAccountRepository } from '../repositories/account-repository'
import { PasswordNotMatchError } from './errors/password-not-match-error'
import { AccountAlreadyExistsError } from './errors/account-already-exists-error'
import { hash } from 'bcryptjs'

interface ICreateAccount {
  email: string
  password: string
  confirmation_password: string
}

interface ICreateAccountUseCase {
  account: Account
}

export class CreateAccountUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute({
    email,
    password,
    confirmation_password,
  }: ICreateAccount): Promise<ICreateAccountUseCase> {
    const accountExist = await this.accountRepository.findByEmail(email)

    if (accountExist) throw new AccountAlreadyExistsError()

    if (password !== confirmation_password) throw new PasswordNotMatchError()

    const password_hash = await hash(password, 6)
    const account = await this.accountRepository.create({
      email,
      password_hash,
    })

    return { account }
  }
}
