// Third party
import { Org, Prisma } from '@prisma/client'

// Project
import { IOrgRepository } from '../repositories/org-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface IUpdateOrg {
  org_id: string
  data: Prisma.OrgUpdateInput
}

interface IUpdateOrgUseCase {
  org: Org
}

export class UpdateOrgUseCase {
  constructor(private orgRepository: IOrgRepository) {}

  async execute({ org_id, data }: IUpdateOrg): Promise<IUpdateOrgUseCase> {
    const orgFindById = await this.orgRepository.findById(org_id)

    if (!orgFindById) {
      throw new ResourceNotFoundError()
    }

    if (data.id || data.email || data.password_hash || data.created) {
      delete data.email
      delete data.password_hash
      delete data.id
      delete data.created
    }

    const org = await this.orgRepository.update(org_id, data)
    return { org }
  }
}
