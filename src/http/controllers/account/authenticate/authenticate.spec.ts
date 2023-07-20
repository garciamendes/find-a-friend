// Third party
import request from 'supertest'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { app } from '../../../../app'

// Project

describe('Authenticate (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('É possível que o usuário possa se Autenticar na aplicação', async () => {
    await request(app.server).post('api/account/create').send({
      email: 'JonhDoe@gmail.com',
      password: 'dev123',
      confirmation_password: 'dev123',
    })

    const response = await request(app.server).post('/api/account/auth').send({
      email: 'JonhDoe@gmail.com',
      password: 'dev123',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      Token: expect.any(String),
    })
  })
})
