// Third party
import request from 'supertest'
import { FastifyInstance } from 'fastify'
import { hash } from 'bcryptjs'

// Project
import { prisma } from '../../lib/prisma'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await prisma.account.create({
    data: {
      email: 'JonhDoe@gmail.com',
      password_hash: await hash('dev123', 6),
    },
  })

  const authResponse = await request(app.server)
    .post('/api/account/auth')
    .send({
      email: 'JonhDoe@gmail.com',
      password: 'dev123',
    })

  const { Token } = authResponse.body
  return { Token }
}
