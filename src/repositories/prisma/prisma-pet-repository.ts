// Third party
import { Prisma } from '@prisma/client'

// Project
import { prisma } from '../../lib/prisma'
import { IPetRepository } from '../pet-repository'

export class PrismaPetRepository implements IPetRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findManyByCity(city: string) {
    const pets = await prisma.pet.findMany({
      where: {
        city: {
          contains: city,
        },
      },
    })

    if (!pets) return null

    return pets
  }

  // async findById(org_id: string) {
  //   const org = await prisma.org.findUnique({
  //     where: { id: org_id },
  //   })

  //   return org
  // }

  // async update(org_id: string, data: Prisma.OrgUpdateInput) {
  //   const org = await prisma.org.update({
  //     where: { id: org_id },
  //     data,
  //   })

  //   return org
  // }

  // async delete(org_id: string) {
  //   await prisma.org.delete({
  //     where: { id: org_id },
  //   })

  //   return 'Org deleted successfully'
  // }
}
