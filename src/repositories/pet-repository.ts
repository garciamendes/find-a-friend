// Third party
import { Prisma, Pet } from '@prisma/client'

export interface IPetRepository {
  create: (data: Prisma.PetUncheckedCreateInput) => Promise<Pet>
  findManyByCity: (city: string) => Promise<Pet[] | null>
  // update: (org_id: string, data: Prisma.OrgUpdateInput) => Promise<Pet>
  // delete: (org_id: string) => Promise<String>
  // findByEmail: (email: string) => Promise<Pet | null>
  // findById: (org_id: string) => Promise<Pet | null>
}
