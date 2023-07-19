// Third party
import { PrismaPetRepository } from '../../repositories/prisma/prisma-pet-repository'
import { FindManyPetByCity } from '../find-many-pet-by-city'

export function makeFindManyByCityPetUseCase() {
  const petRepository = new PrismaPetRepository()
  const findManyByCityPetUseCase = new FindManyPetByCity(petRepository)

  return findManyByCityPetUseCase
}
