// Project
import { IOrgRepository } from '../repositories/org-repository'
import { OrgNotExistsError } from './errors/org-not-exists.error'

export class DeleteOrgUseCase {
  constructor(private orgRepository: IOrgRepository) {}

  async execute(org_id: string): Promise<String> {
    const orgFindedById = await this.orgRepository.findById(org_id)

    if (!orgFindedById) {
      throw new OrgNotExistsError()
    }

    await this.orgRepository.delete(org_id)

    return 'Org deleted successfully'
  }
}
