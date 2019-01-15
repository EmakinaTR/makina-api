import _ from 'lodash'
import { createConnection, getConnection, getConnectionOptions } from 'typeorm'
import { NamingStrategy } from './NamingStrategy'
import { ConfigService } from '../services'
import retry = require('async-retry');

/**
 * Singleton class managing database connections.
 * @class
 */
class Database {
  /**
   * Connects to configured database.
   */
  async connect (): Promise<void> {
    const config = ConfigService.get('database')
    const options = await getConnectionOptions()
    _.merge(options, {
      name: 'default',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_SCHEMA,
      logging: config.logging,
      namingStrategy: new NamingStrategy(),
      migrationsRun: true,
      multipleStatements: true
    })

    await retry(async () => {
      // if throws 'ECONNREFUSED', it retries
      try {
        await createConnection(options)
      } catch (e) {
        if (e.code === 'ECONNREFUSED') {
          throw e
        }
        console.error(e)
      }
    }, {
      retries: config.retryCount
    })
  }

  /**
   * Disconnects from configured database if there is an active connection.
   */
  async disconnect (): Promise<void> {
    const connection = getConnection()
    if (!connection) {
      return
    }
    await connection.close()
  }
}

export default new Database()
