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

    return pets
  }

  async findById(pet_id: string) {
    const pet = await prisma.pet.findUnique({
      where: { id: pet_id },
    })

    return pet
  }
}
