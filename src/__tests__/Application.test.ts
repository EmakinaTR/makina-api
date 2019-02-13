import request from 'supertest'
import Application from '../Application'
import Database from '../data/Database' // eslint-disable-line

describe('server', () => {
  beforeAll(async () => {
    jest.spyOn(Database, 'connect').mockImplementation(async (): Promise<void> => {})
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
