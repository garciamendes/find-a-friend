// Third party
import { Prisma, Org } from '@prisma/client'

export interface IOrgRepository {
  create: (data: Prisma.OrgCreateInput) => Promise<Org>
  update: (org_id: string, data: Prisma.OrgUpdateInput) => Promise<Org>
  delete: (org_id: string) => Promise<String>
  findByEmail: (email: string) => Promise<Org | null>
  findById: (org_id: string) => Promise<Org | null>
}
