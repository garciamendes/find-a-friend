// Third party
import { beforeEach, describe, expect, it } from 'vitest'

// Project
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pet-repository'
import { InMemoryOrgRepository } from '../repositories/in-memory/in-memory-org-repository'

// Local
import { CreatePetUseCase } from './create-pet-'
import { CreateOrgUseCase } from './create-org'
import { InMemoryAccountRepository } from '../repositories/in-memory/in-memory-account-repository'

let petRepository: InMemoryPetsRepository
let orgRepository: InMemoryOrgRepository
let sut: CreatePetUseCase

describe('Create Use Case', () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetsRepository()
    orgRepository = new InMemoryOrgRepository()
    sut = new CreatePetUseCase(petRepository, orgRepository)
  })

  it('Validando se é possível a criação de um novo pet', async () => {
    const accountRepository = new InMemoryAccountRepository()
    const createOrg = new CreateOrgUseCase(orgRepository, accountRepository)

    const account = await accountRepository.create({
      email: 'garcia@gmail.com',
      password_hash: 'dev123',
    })

    const { org } = await createOrg.execute({
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

    const { pet } = await sut.execute({
      name: 'Matheus',
      description: 'Get_friendly_org',
      age: 'CUB',
      type: 'LITTLE',
      levelEnergy: 'LITTLE',
      levelIndependence: 'LITTLE',
      environment: 'OPENED',
      images_urls: [
        'imagesPrivate/org_id/pet_id/image_1',
        'imagesPrivate/org_id/pet_id/image_1',
      ],
      requirementsAdoption: ['Sem antecedente criminais'],
      org_id: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
