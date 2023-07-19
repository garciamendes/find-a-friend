import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function accountRoutes(app: FastifyInstance) {
  // Public routes
  app.post('/create', create)
}
