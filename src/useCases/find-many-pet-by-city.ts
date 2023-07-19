// Third party
import { Pet } from '@prisma/client'

// Project
import { IPetRepository } from '../repositories/pet-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface IFindManyByCityPetUseCase {
  pets: Pet[]
}

export class FindManyPetByCity {
  constructor(private petRepository: IPetRepository) {}

  async execute(city: string): Promise<IFindManyByCityPetUseCase> {
    const pets = await this.petRepository.findManyByCity(city)

    if (!pets) {
      throw new ResourceNotFoundError()
    }

    return { pets }
  }
}
