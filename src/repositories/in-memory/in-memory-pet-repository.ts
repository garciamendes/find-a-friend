// Node
import { randomUUID } from 'node:crypto'

// Third party
import { Pet, Prisma } from '@prisma/client'

// Project
import { IPetRepository } from '../pet-repository'

export class InMemoryPetsRepository implements IPetRepository {
  public items: Pet[] = []

  /**
   * @param data {
      id?: string
      name: string
      description: string
      age?: Age
      type?: TypePet
      levelEnergy?: LevelEnergy
      levelIndependence?: LevelIndependence
      environment?: Environment
      images_urls?: PetCreateimages_urlsInput | Enumerable<string>
      requirementsAdoption?: PetCreaterequirementsAdoptionInput | Enumerable<string>
      org_id: string
      status?: Status
      city?: string | null
      created?: Date | string
      modified?: Date | string
   */

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      age: data.age || 'NULL',
      type: data.type || 'NULL',
      levelEnergy: data.levelEnergy || 'NULL',
      levelIndependence: data.levelIndependence || 'NULL',
      environment: data.environment || 'NULL',
      images_urls: Array.isArray(data.images_urls) ? data.images_urls : [],
      requirementsAdoption: Array.isArray(data.requirementsAdoption)
        ? data.requirementsAdoption
        : [],
      org_id: data.org_id,
      status: data.status || 'FREE',
      city: data.city || '',
      created: new Date(),
      modified: new Date(),
    }

    this.items.push(pet)
    return pet
  }

  async findManyByCity(city: string) {
    const pets = this.items.filter((row) =>
      row.city?.toLowerCase().includes(city.toLowerCase()),
    )

    if (!pets) return null

    return pets
  }

  async findById(pet_id: string) {
    const pet = this.items.find((pet) => pet.id === pet_id)

    if (!pet) return null

    return pet
  }
}
