// Third party
import { Prisma, Pet } from '@prisma/client'

export interface IPetRepository {
  create: (data: Prisma.PetUncheckedCreateInput) => Promise<Pet>
  findManyByCity: (city: string) => Promise<Pet[] | null>
  findById: (pet_id: string) => Promise<Pet | null>
}
