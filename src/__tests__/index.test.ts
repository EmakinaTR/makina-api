import * as request from 'supertest'
import { server } from '../index'

describe('server', () => {
  test('should respond as expected', async () => {
    const response = await request(server).get('/')
    expect(response.status).toEqual(200)
  })
})
