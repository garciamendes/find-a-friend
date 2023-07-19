// Third party
import {
  Age,
  LevelEnergy,
  LevelIndependence,
  TypePet,
  Environment,
  Pet,
  Status,
} from '@prisma/client'

// Project
import { IPetRepository } from '../repositories/pet-repository'
import { IOrgRepository } from '../repositories/org-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ICreatePet {
  id?: string
  name: string
  description: string
  age: Age
  type: TypePet
  levelEnergy: LevelEnergy
  levelIndependence: LevelIndependence
  environment: Environment
  images_urls: Array<string>
  requirementsAdoption: Array<string>
  org_id: string
  status?: Status
  city?: string
}

interface ICreatePetUseCase {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petRepository: IPetRepository,
    private orgRepository: IOrgRepository,
  ) {}

  async execute(data: ICreatePet): Promise<ICreatePetUseCase> {
    const orgExist = await this.orgRepository.findById(data.org_id)
    if (!orgExist) throw new ResourceNotFoundError()

    const pet = await this.petRepository.create({
      name: data.name,
      description: data.description,
      age: data.age,
      type: data.type,
      levelEnergy: data.levelEnergy,
      levelIndependence: data.levelIndependence,
      environment: data.environment,
      images_urls: data.images_urls,
      requirementsAdoption: data.requirementsAdoption,
      org_id: data.org_id,
      city: orgExist.city,
      status: data.status,
      created: new Date(),
      modified: new Date(),
    })

    return { pet }
  }
}
