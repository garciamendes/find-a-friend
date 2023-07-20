// Third party
import { FastifyInstance } from 'fastify'

// Project
import { verifyJwt } from '../../middlewares/verify-jwt'

// Local
import { create } from './create'
import { upload } from '../../../utils/uploadImage'
import { findById } from './retrieve'
import { findManyByCity } from './findManyByCity'

export async function petRoutes(app: FastifyInstance) {
  app.post(
    '/',
    { onRequest: [verifyJwt], preHandler: upload.array('images', 5) },
    create,
  )
  app.get('/:pet_id', { onRequest: [verifyJwt] }, findById)
  app.get('/', { onRequest: [verifyJwt] }, findManyByCity)
}
