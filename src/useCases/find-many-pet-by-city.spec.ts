// Third party
import { beforeEach, describe, expect, it } from 'vitest'

// Project
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pet-repository'

// Local
import { FindManyPetByCity } from './find-many-pet-by-city'
import { CreatePetUseCase } from './create-pet-'
import { InMemoryOrgRepository } from '../repositories/in-memory/in-memory-org-repository'
import { CreateOrgUseCase } from './create-org'

let petRepository: InMemoryPetsRepository
let sut: FindManyPetByCity

describe('Find by city Use Case', () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetsRepository()
    sut = new FindManyPetByCity(petRepository)
  })

  it('Validando se é possível filtrar pets por cidade', async () => {
    const orgRepository = new InMemoryOrgRepository()
    const createOrg = new CreateOrgUseCase(orgRepository)

    const createPet = new CreatePetUseCase(petRepository)

    const { org: org_1 } = await createOrg.execute({
      name: 'Matheus',
      name_org: 'Get_friendly_org',
      street_number: 231,
      whatsapp: '85988993322',
      email: 'ga@gmail.com',
      password_hash: 'dev123',
      address: 'Rua Ipa',
      cep: '60123-123',
      city: 'Fortaleza',
      neighborhood: 'Praia do passado',
      state: 'CE',
    })
    const { org: org_2 } = await createOrg.execute({
      name: 'Matheus',
      name_org: 'Get_friendly_org_SP',
      street_number: 231,
      whatsapp: '85988993322',
      email: 'g@gmail.com',
      password_hash: 'dev123',
      address: 'Rua Ipa',
      cep: '60123-123',
      city: 'São Paulo',
      neighborhood: 'Praia do passado',
      state: 'CE',
    })

    await createPet.execute({
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
    await createPet.execute({
      name: `dog_03`,
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
      org_id: org_2.id,
      city: org_2.city,
    })

    const { pets } = await sut.execute('Fortaleza')
    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: `dog_01`, city: 'Fortaleza' }),
      expect.objectContaining({ name: `dog_02`, city: 'Fortaleza' }),
    ])
  })
})
