// Third party
import { Prisma } from '@prisma/client'

// Project
import { prisma } from '../../lib/prisma'
import { IOrgRepository } from '../org-repository'

export class PrismaOrgRepository implements IOrgRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }
}
