// Third party
import { Org, Prisma } from '@prisma/client'

// Project
import { IOrgRepository } from '../repositories/org-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface IUpdateOrg {
  org_id: string
  data: Prisma.OrgUncheckedUpdateInput
}

interface IUpdateOrgUseCase {
  org: Org
}

export class UpdateOrgUseCase {
  constructor(private orgRepository: IOrgRepository) {}

  async execute({ org_id, data }: IUpdateOrg): Promise<IUpdateOrgUseCase> {
    const orgFindedById = await this.orgRepository.findById(org_id)

    if (!orgFindedById) {
      throw new ResourceNotFoundError()
    }

    if (data.id || data.account_id || data.created) {
      delete data.account_id
      delete data.id
      delete data.created
    }

    const org = await this.orgRepository.update(org_id, data)
    return { org }
  }
}
