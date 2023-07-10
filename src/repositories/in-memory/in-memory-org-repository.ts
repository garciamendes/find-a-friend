// Node
import { randomUUID } from 'node:crypto'

// Third party
import { Org, Prisma } from '@prisma/client'

// Project
import { IOrgRepository } from '../org-repository'

export class InMemoryOrgRepository implements IOrgRepository {
  public items: Org[] = []

  /**
   * @param data {
      id?: string
      email: string
      password_hash: string
      name: string
      name_org: string
      cep: string
      street_number: number
      neighborhood: string
      city: string
      state: string
      address: string
      whatsapp: string
      role?: Role
      created?: Date | string}
   */

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      email: data.email,
      password_hash: data.password_hash,
      name: data.name,
      name_org: data.name_org,
      cep: data.cep,
      street_number: data.street_number,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
      address: data.address,
      whatsapp: data.whatsapp,
      role: data.role || 'USER',
      created: new Date(),
    }

    this.items.push(org)
    return org
  }

  async update(org_id: string, data: Prisma.OrgUpdateInput) {
    const orgIndex = this.items.findIndex((org) => org.id === org_id)

    if (orgIndex === -1) return null
    let org = this.items[orgIndex] as any

    const updatedOrg = {
      name: data.name || org.name,
      name_org: data.name_org || org.name_org,
      cep: data.cep || org.cep,
      street_number: data.street_number || org.street_number,
      neighborhood: data.neighborhood || org.neighborhood,
      city: data.city || org.city,
      state: data.state || org.state,
      address: data.address || org.address,
      whatsapp: data.whatsapp || org.whatsapp,
      role: data.role || org.role,

      // not update
      id: org.id,
      email: org.email,
      password_hash: org.password_hash,
      created: org.created,
    }

    org = updatedOrg
    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((org) => org.email === email)

    if (!org) return null

    return org
  }

  async findById(org_id: string) {
    const org = this.items.find((org) => org.id === org_id)

    if (!org) return null

    return org
  }

  async delete(org_id: string) {
    const orgIndex = this.items.findIndex((org) => org.id === org_id)
    delete this.items[orgIndex]

    return 'Org deleted successfully'
  }
}
