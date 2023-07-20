// Third party
import fastify from 'fastify'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastifyMulter from 'fastify-multer'

// Local
import { env } from './env'
import { accountRoutes } from './http/controllers/account/routes'
import { orgRoutes } from './http/controllers/org/routes'
import { petRoutes } from './http/controllers/pet/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '1d',
  },
})
app.register(fastifyCookie)
app.register(fastifyMulter.contentParser)

// routes
app.register(accountRoutes, { prefix: 'api/account' })
app.register(orgRoutes, { prefix: 'api/org' })
app.register(petRoutes, { prefix: 'api/pet' })

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issue: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
