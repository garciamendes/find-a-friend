// Third party
import { beforeEach, describe, expect, it } from 'vitest'

// Project
import { InMemoryOrgRepository } from '../repositories/in-memory/in-memory-org-repository'

// Local
import { UpdateOrgUseCase } from './update-org'
import { InMemoryAccountRepository } from '../repositories/in-memory/in-memory-account-repository'

let orgRepository: InMemoryOrgRepository
let sut: UpdateOrgUseCase

describe('Update Use Case', () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository()
    sut = new UpdateOrgUseCase(orgRepository)
  })

  it('Validando se é possível fazer a atualização da org', async () => {
    const accountRepository = new InMemoryAccountRepository()
    const account = await accountRepository.create({
      email: 'garcia@gmail.com',
      password_hash: 'dev123',
    })

    const org_before_update = await orgRepository.create({
      name: 'Matheus',
      name_org: 'Get_friendly_org',
      street_number: 231,
      whatsapp: '85988993322',
      address: 'Rua Ipa',
      cep: '60123-123',
      city: 'Fortaleza',
      neighborhood: 'Praia do passado',
      state: 'CE',
      account_id: account.id,
    })

    const data = {
      name: 'João',
      name_org: 'teste',
      street_number: 102,
      whatsapp: '85988993311',
    }

    const { org } = await sut.execute({ org_id: org_before_update.id, data })
    expect(org).toEqual({
      // Campos mudados
      name: data.name,
      name_org: data.name_org,
      street_number: data.street_number,
      whatsapp: data.whatsapp,

      // Não teste
      id: org_before_update.id,
      account_id: org_before_update.account_id,
      address: org_before_update.address,
      cep: org_before_update.cep,
      city: org_before_update.city,
      neighborhood: org_before_update.neighborhood,
      state: org_before_update.state,
      created: org_before_update.created,
      role: org_before_update.role,
    })
  })
})
