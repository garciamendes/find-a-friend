// Third party
import { Org } from '@prisma/client'

// Project
import { IOrgRepository } from '../repositories/org-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { IAccountRepository } from '../repositories/account-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ICreateOrg {
  name: string
  name_org: string
  cep: string
  street_number: number
  neighborhood: string
  city: string
  state: string
  address: string
  whatsapp: string
  account_id: string
}

interface ICreateOrgUseCase {
  org: Org
}

export class CreateOrgUseCase {
  constructor(
    private orgRepository: IOrgRepository,
    private accountRepository: IAccountRepository,
  ) {}

  async execute(data: ICreateOrg): Promise<ICreateOrgUseCase> {
    const accountExist = await this.accountRepository.findById(data.account_id)
    if (!accountExist) throw new ResourceNotFoundError()

    const orgExist = await this.orgRepository.findByAccountId(data.account_id)
    if (orgExist) throw new OrgAlreadyExistsError()

    const org = await this.orgRepository.create({
      name: data.name,
      name_org: data.name_org,
      cep: data.cep,
      street_number: data.street_number,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
      address: data.address,
      whatsapp: data.whatsapp,
      account_id: data.account_id,
    })

    return { org }
  }
}
