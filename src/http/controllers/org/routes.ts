// Third party
import { FastifyInstance } from 'fastify'

// Project
import { verifyJwt } from '../../middlewares/verify-jwt'

// Local
import { create } from './create'
import { update } from './update'
import { deleteOrg } from './delete'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/', { onRequest: [verifyJwt] }, create)
  app.patch('/:org_id', { onRequest: [verifyJwt] }, update)
  app.delete('/:org_id', { onRequest: [verifyJwt] }, deleteOrg)
}
