// Third party
import { beforeEach, describe, expect, it } from 'vitest'

// Project
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pet-repository'

// Local
import { CreatePetUseCase } from './create-pet-'
import { InMemoryOrgRepository } from '../repositories/in-memory/in-memory-org-repository'
import { CreateOrgUseCase } from './create-org'
import { FindByIdPet } from './find-by-id-pet'
import { InMemoryAccountRepository } from '../repositories/in-memory/in-memory-account-repository'

let petRepository: InMemoryPetsRepository
let sut: FindByIdPet

describe('Find by ID Use Case', () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetsRepository()
    sut = new FindByIdPet(petRepository)
  })

  it('Validando se é possível buscar o detalhe do pet', async () => {
    const orgRepository = new InMemoryOrgRepository()
    const accountRepository = new InMemoryAccountRepository()
    const createOrg = new CreateOrgUseCase(orgRepository, accountRepository)

    const account = await accountRepository.create({
      email: 'garcia@gmail.com',
      password_hash: 'dev123',
    })

    const createPet = new CreatePetUseCase(petRepository)

    const { org: org_1 } = await createOrg.execute({
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

    const { pet: pet_01 } = await createPet.execute({
      name: `dog_01`,
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
      org_id: org_1.id,
      city: org_1.city,
    })

    await createPet.execute({
      name: `dog_02`,
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
      org_id: org_1.id,
      city: org_1.city,
    })

    const { pet } = await sut.execute(pet_01.id)
    expect(pet).toEqual(expect.objectContaining({ name: `dog_01` }))
  })
})
