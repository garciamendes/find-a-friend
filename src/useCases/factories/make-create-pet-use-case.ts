// Third party
import { PrismaOrgRepository } from '../../repositories/prisma/prisma-org-repository'
import { PrismaPetRepository } from '../../repositories/prisma/prisma-pet-repository'
import { CreatePetUseCase } from '../create-pet-'

export function makeCreatePetUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const petRepository = new PrismaPetRepository()
  const createPetUseCase = new CreatePetUseCase(petRepository, orgRepository)

  return createPetUseCase
}
