// Third party
import { beforeEach, describe, expect, it } from 'vitest'

// Project
import { InMemoryOrgRepository } from '../repositories/in-memory/in-memory-org-repository'

// Local
import { DeleteOrgUseCase } from './delete-org'

let orgRepository: InMemoryOrgRepository
let sut: DeleteOrgUseCase

describe('Delete Use Case', () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository()
    sut = new DeleteOrgUseCase(orgRepository)
  })

  it('Validando se é possível deletar uma org', async () => {
    const org_created = await orgRepository.create({
      name: 'Matheus',
      name_org: 'Get_friendly_org',
      street_number: 231,
      whatsapp: '85988993322',
      email: 'g@gmail.com',
      password_hash: 'dev123',
      address: 'Rua Ipa',
      cep: '60123-123',
      city: 'Fortaleza',
      neighborhood: 'Praia do passado',
      state: 'CE',
    })

    const mensagem_org_deleted = await sut.execute(org_created.id)
    expect(mensagem_org_deleted).toEqual('Org deleted successfully')
  })
})
