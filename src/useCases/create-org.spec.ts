// Third party
import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'

// Project
import { InMemoryOrgRepository } from '../repositories/in-memory/in-memory-org-repository'

// Local
import { CreateOrgUseCase } from './create-org'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgRepository: InMemoryOrgRepository
let sut: CreateOrgUseCase

describe('Create Use Case', () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository()
    sut = new CreateOrgUseCase(orgRepository)
  })

  it('Validando se é possível a criado de uma nova org', async () => {
    const { org } = await sut.execute({
      name: 'Matheus',
      name_org: 'Get_friendly_org',
      email: 'g@gmail.com',
      password_hash: 'dev123',
      address: 'Rua Ipa',
      cep: '60123-123',
      city: 'Fortaleza',
      neighborhood: 'Praia do passado',
      state: 'CE',
      street_number: 231,
      whatsapp: '85988993322',
    })

    const isPasswordCorrectlyhashed = await compare('dev123', org.password_hash)
    expect(isPasswordCorrectlyhashed).toBe(true)
  })

  it('Validando se a aplicação vai emitir um erro para org com mesmo email', async () => {
    await sut.execute({
      name: 'Matheus',
      name_org: 'Get_friendly_org',
      email: 'g@gmail.com',
      password_hash: 'dev123',
      address: 'Rua Ipa',
      cep: '60123-123',
      city: 'Fortaleza',
      neighborhood: 'Praia do passado',
      state: 'CE',
      street_number: 231,
      whatsapp: '85988993322',
    })

    await expect(() =>
      sut.execute({
        name: 'Matheus',
        name_org: 'Get_friendly_org',
        email: 'g@gmail.com',
        password_hash: 'dev123',
        address: 'Rua Ipa',
        cep: '60123-123',
        city: 'Fortaleza',
        neighborhood: 'Praia do passado',
        state: 'CE',
        street_number: 231,
        whatsapp: '85988993322',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
