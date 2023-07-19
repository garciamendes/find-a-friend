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

  // async update(org_id: string, data: Prisma.OrgUpdateInput) {
  //   const orgIndex = this.items.findIndex((org) => org.id === org_id)

  //   if (orgIndex === -1) return null
  //   let org = this.items[orgIndex] as any

  //   const updatedOrg = {
  //     name: data.name || org.name,
  //     name_org: data.name_org || org.name_org,
  //     cep: data.cep || org.cep,
  //     street_number: data.street_number || org.street_number,
  //     neighborhood: data.neighborhood || org.neighborhood,
  //     city: data.city || org.city,
  //     state: data.state || org.state,
  //     address: data.address || org.address,
  //     whatsapp: data.whatsapp || org.whatsapp,
  //     role: data.role || org.role,

  //     // not update
  //     id: org.id,
  //     email: org.email,
  //     password_hash: org.password_hash,
  //     created: org.created,
  //   }

  //   org = updatedOrg
  //   return org
  // }

  // async findByEmail(email: string) {
  //   const org = this.items.find((org) => org.email === email)

  //   if (!org) return null

  //   return org
  // }

  // async findById(org_id: string) {
  //   const org = this.items.find((org) => org.id === org_id)

  //   if (!org) return null

  //   return org
  // }

  // async delete(org_id: string) {
  //   const orgIndex = this.items.findIndex((org) => org.id === org_id)
  //   delete this.items[orgIndex]

  //   return 'Org deleted successfully'
  // }
}
