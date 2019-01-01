import request from 'supertest'
import Application from '../Application'

describe('server', () => {
  beforeAll(async () => {
    await Application.start()
  })

  afterAll(async () => {
    await Application.stop()
  })

  test('should respond as expected', async () => {
    const server = Application.getServer()
    const response = await request(server).get('/')
    console.log(response)
    expect(response.status).toEqual(200)
  })
})
