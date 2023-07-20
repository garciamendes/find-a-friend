// Third party
import request from 'supertest'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

// Project
import { app } from '../../../../app'
import { createAndAuthenticateUser } from '../../../../utils/test/create-and-authenticate-account'

describe('Create org (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('É possível a criação de uma nova org', async () => {
    const { Token } = await createAndAuthenticateUser(app)
    const response = await request(app.server)
      .post('api/org/create')
      .set('Authorization', `Bearer ${Token}`)
      .send({
        name: 'Smart Fit',
        name_org: 'teste_01',
        cep: '51231231',
        street_number: 123,
        neighborhood: 'Praia do futuro',
        city: 'Fortaleza',
        state: 'Ceará',
        address: 'Rua p',
        whatsapp: '(85) 9 88998833',
      })

    expect(response.statusCode).toEqual(201)
  })
})
