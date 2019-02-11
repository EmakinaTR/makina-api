import request from 'supertest'
import Application from '../Application'

describe('server', () => {
  beforeAll(async () => {
    jest.mock('../data/Database')
    await Application.start()
  })

  afterAll(async () => {
    await Application.stop()
  })

  test('should return 404 to /', async () => {
    const server = Application.getServer()
    const response = await request(server).get('/')
    expect(response.status).toEqual(404)
  })

  test('should return 500 to /graphql', async () => {
    const server = Application.getServer()
    const response = await request(server).post('/graphql')
    expect(response.status).toEqual(500)
  })
})
