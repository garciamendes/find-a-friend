// Third party
import { beforeEach, describe, expect, it } from 'vitest'

// Project
import { InMemoryAccountRepository } from '../repositories/in-memory/in-memory-account-repository'

// Local
import { CreateAccountUseCase } from './create-account'
import { PasswordNotMatchError } from './errors/password-not-match-error'

let accountRepository: InMemoryAccountRepository
let sut: CreateAccountUseCase

describe('Create Use Case', () => {
  beforeEach(async () => {
    accountRepository = new InMemoryAccountRepository()
    sut = new CreateAccountUseCase(accountRepository)
  })

  it('Validando se é possível a criação de uma nova conta', async () => {
    const { account } = await sut.execute({
      email: 'garcia@gmail.com',
      password: 'dev123',
      confirmation_password: 'dev123',
    })

    expect(account.id).toEqual(expect.any(String))
  })

  it('Validando se emitirar mensagem de erro para senhas não iguais', async () => {
    await expect(() =>
      sut.execute({
        email: 'garcia@gmail.com',
        password: 'dev123',
        confirmation_password: 'dev12356',
      }),
    ).rejects.toBeInstanceOf(PasswordNotMatchError)
  })
})
