// Third party
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'

// Project

// Local
import { AuthenticateAccountUseCase } from './authenticate'
import { InvalidCrendetialsError } from './errors/invalid-crendetials.error'
import { InMemoryAccountRepository } from '../repositories/in-memory/in-memory-account-repository'

let accountRepository: InMemoryAccountRepository
let sut: AuthenticateAccountUseCase

describe('Authenticate Use Case', () => {
  beforeEach(async () => {
    accountRepository = new InMemoryAccountRepository()
    sut = new AuthenticateAccountUseCase(accountRepository)
  })

  it('Validando se o usuário consegue se autenticar', async () => {
    await accountRepository.create({
      email: 'garcia1@gmail.com',
      password_hash: await hash('dev123', 6),
    })

    const { account } = await sut.execute({
      email: 'garcia1@gmail.com',
      password: 'dev123',
    })

    expect(account.id).toEqual(expect.any(String))
  })

  it('Validando se o usuário consegue se autenticar com email não existente', async () => {
    expect(() =>
      sut.execute({
        email: 'garcia13@gmail.com',
        password: 'dev123',
      }),
    ).rejects.toBeInstanceOf(InvalidCrendetialsError)
  })

  it('Validando se o usuário consegue se autenticar com senha errada', async () => {
    await accountRepository.create({
      email: 'garcia1@gmail.com',
      password_hash: await hash('dev12345', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'garcia1@gmail.com',
        password: 'dev123',
      }),
    ).rejects.toBeInstanceOf(InvalidCrendetialsError)
  })
})
