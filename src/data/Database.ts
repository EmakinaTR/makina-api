import _ from 'lodash'
import { createConnection, getConnection } from 'typeorm'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions' // eslint-disable-line no-unused-vars
import retry from 'async-retry'
import { NamingStrategy } from './NamingStrategy'
import { ConfigService } from '../services'
import * as entities from './entities'
import * as migrations from './migrations'

const DEFAULT_CONNECTION_ERROR_MESSAGE = 'Failed to connect to the database.'

/**
 * Singleton class managing database connections.
 * @class
 */
class Database {
  private _connected: boolean = false

  /**
   * Connects to configured database.
   */
  async connect (): Promise<void> {
    const config = ConfigService.get('database')
    const options: MysqlConnectionOptions = {
      type: 'mysql',
      name: 'default',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_SCHEMA,
      logging: config.logging,
      namingStrategy: new NamingStrategy(),
      migrationsRun: true,
      multipleStatements: true,
      synchronize: false,
      entities: _.values(entities),
      migrations: _.values(migrations)
    }

    await retry(async (bail, retryCount) => {
      // if throws 'ECONNREFUSED', it retries
      try {
        await createConnection(options)
        this._connected = true
      } catch (e) {
        if (e.code === 'ECONNREFUSED') {
          console.warn(`${DEFAULT_CONNECTION_ERROR_MESSAGE} Retry #${retryCount}.`)
          throw e
        }
        console.error(e)
        bail(new Error(DEFAULT_CONNECTION_ERROR_MESSAGE))
      }
    }, {
      retries: config.connectionRetryCount,
      minTimeout: config.connectionRetryDelay
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

  isConnected (): boolean {
    return this._connected
  }
}

export default new Database()
