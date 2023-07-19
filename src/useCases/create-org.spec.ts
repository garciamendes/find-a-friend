// Third party
import { beforeEach, describe, expect, it } from 'vitest'

// Project
import { InMemoryOrgRepository } from '../repositories/in-memory/in-memory-org-repository'

// Local
import { CreateOrgUseCase } from './create-org'
import { InMemoryAccountRepository } from '../repositories/in-memory/in-memory-account-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgRepository: InMemoryOrgRepository
let accountRepository: InMemoryAccountRepository
let sut: CreateOrgUseCase

describe('Create Use Case', () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository()
    accountRepository = new InMemoryAccountRepository()
    sut = new CreateOrgUseCase(orgRepository, accountRepository)
  })

  it('Validando se é possível a criado de uma nova org', async () => {
    const account = await accountRepository.create({
      email: 'garcia@gmail.com',
      password_hash: 'dev123',
    })

    const { org } = await sut.execute({
      name: 'Get_friendly_org',
      name_org: 'Get_friendly_org',
      address: 'Rua Ipa',
      cep: '60123-123',
      city: 'Fortaleza',
      neighborhood: 'Praia do passado',
      state: 'CE',
      street_number: 231,
      whatsapp: '85988993322',
      account_id: account.id,
    })

    expect(org.id).toEqual(expect.any(String))
    expect(org.account_id).toEqual(expect.any(String))
  })

  it('Validando se a aplicação vai emitir um erro para org com mesma conta', async () => {
    const account = await accountRepository.create({
      email: 'garcia@gmail.com',
      password_hash: 'dev123',
    })

    await sut.execute({
      name: 'Matheus',
      name_org: 'Get_friendly_org',
      address: 'Rua Ipa',
      cep: '60123-123',
      city: 'Fortaleza',
      neighborhood: 'Praia do passado',
      state: 'CE',
      street_number: 231,
      whatsapp: '85988993322',
      account_id: account.id,
    })

    await expect(() =>
      sut.execute({
        name: 'Matheus',
        name_org: 'Get_friendly_org',
        address: 'Rua Ipa',
        cep: '60123-123',
        city: 'Fortaleza',
        neighborhood: 'Praia do passado',
        state: 'CE',
        street_number: 231,
        whatsapp: '85988993322',
        account_id: account.id,
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
