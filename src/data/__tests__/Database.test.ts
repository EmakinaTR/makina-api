jest.mock('typeorm')
jest.mock('../entities')
import * as typeorm from 'typeorm' // eslint-disable-line
import Database from '../Database' // eslint-disable-line
import { ConfigService } from '../../services' // eslint-disable-line

describe('Database', () => {
  test('should connect and disconnect as expected', async () => {
    const getConnection = jest.spyOn(typeorm, 'getConnection')
    getConnection.mockImplementation((): any => {
      return {
        close: () => {}
      }
    })
    await Database.connect()
    const connected = Database.isConnected()
    expect(connected).toBe(true)
    await Database.disconnect()
  })

  test('should retry to connect for a connection error', async () => {
    let attempt = 0
    const createConnection = jest.spyOn(typeorm, 'createConnection')
    createConnection.mockImplementation(async () => {
      attempt++
      const error = { code: 'ECONNREFUSED' }
      throw error
    })
    let error = null
    try {
      await Database.connect()
    } catch (e) {
      error = e
    }
    expect(error).toBeTruthy()
    const config = ConfigService.get('database')
    expect(attempt).toBe(config.connectionRetryCount + 1)
  })

  test('should not retry to connect for anything else', async () => {
    let attempt = 0
    const createConnection = jest.spyOn(typeorm, 'createConnection')
    createConnection.mockImplementation(async () => {
      attempt++
      throw new Error()
    })
    let error = null
    try {
      await Database.connect()
    } catch (e) {
      error = e
    }
    expect(error).toBeTruthy()
    expect(attempt).toBe(1)
  })
})
