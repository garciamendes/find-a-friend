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

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: { email },
    })

    return org
  }

  async findById(org_id: string) {
    const org = await prisma.org.findUnique({
      where: { id: org_id },
    })

    return org
  }

  async update(org_id: string, data: Prisma.OrgUpdateInput) {
    const org = await prisma.org.update({
      where: { id: org_id },
      data,
    })

    return org
  }

  async delete(org_id: string) {
    await prisma.org.delete({
      where: { id: org_id },
    })

    return 'Org deleted successfully'
  }
}
