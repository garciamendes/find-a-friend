// Third party
import { FastifyInstance } from 'fastify'

// Local
import { create } from './create'
import { authenticate } from './authenticate'
import { refresh } from './refresh'

export async function accountRoutes(app: FastifyInstance) {
  app.post('/create', create)
  app.post('/auth', authenticate)
  app.patch('/auth-refresh', refresh)
}
