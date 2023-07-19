// Third party
import { Pet } from '@prisma/client'

// Project
import { IPetRepository } from '../repositories/pet-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface IFindManyByCityPetUseCase {
  pet: Pet
}

export class FindByIdPet {
  constructor(private petRepository: IPetRepository) {}

  async execute(pet_id: string): Promise<IFindManyByCityPetUseCase> {
    const pet = await this.petRepository.findById(pet_id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
