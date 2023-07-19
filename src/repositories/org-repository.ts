// Third party
import { Prisma, Org } from '@prisma/client'

export interface IOrgRepository {
  create: (data: Prisma.OrgUncheckedCreateInput) => Promise<Org>
  update: (org_id: string, data: Prisma.OrgUncheckedUpdateInput) => Promise<Org>
  delete: (org_id: string) => Promise<String>
  findById: (org_id: string) => Promise<Org | null>
  findByAccountId: (account_id: string) => Promise<Org | null>
}
