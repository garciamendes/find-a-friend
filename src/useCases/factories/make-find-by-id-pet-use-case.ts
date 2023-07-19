// Third party
import { PrismaPetRepository } from '../../repositories/prisma/prisma-pet-repository'
import { FindByIdPet } from '../find-by-id-pet'

export function makeFindByIdPetUseCase() {
  const petRepository = new PrismaPetRepository()
  const findByIdPetUseCase = new FindByIdPet(petRepository)

  return findByIdPetUseCase
}
