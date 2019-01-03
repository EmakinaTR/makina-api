import request from 'supertest'
import Application from '../Application'
jest.mock('../data/Database')

describe('server', () => {
  beforeAll(async () => {

  })

  afterAll(async () => {

  })

  test('should start and stop as expected', async () => {
    await Application.start()
    const server = Application.getServer()
    const response = await request(server).get('/')
    expect(response.status).toEqual(404)
    await Application.stop()
  })
})
