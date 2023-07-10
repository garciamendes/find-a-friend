// Third party
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'

// Project
import { IOrgRepository } from '../repositories/org-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface ICreateOrg {
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
}

interface ICreateOrgUseCase {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgRepository: IOrgRepository) {}

  async execute(data: ICreateOrg): Promise<ICreateOrgUseCase> {
    const orgExist = await this.orgRepository.findByEmail(data.email)

    if (orgExist) throw new OrgAlreadyExistsError()

    const password_hash = await hash(data.password_hash, 6)

    const org = await this.orgRepository.create({
      email: data.email,
      password_hash,
      name: data.name,
      name_org: data.name_org,
      cep: data.cep,
      street_number: data.street_number,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
      address: data.address,
      whatsapp: data.whatsapp,
    })

    return { org }
  }
}
