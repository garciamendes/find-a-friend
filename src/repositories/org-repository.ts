// Third party
import { Prisma, Org } from '@prisma/client'

export interface IOrgRepository {
  create: (data: Prisma.OrgCreateInput) => Promise<Org>
  findByEmail: (email: string) => Promise<Org | null>
}
