import _ from 'lodash'
import { createConnection, getConnection, getConnectionOptions } from 'typeorm'
import { NamingStrategy } from './NamingStrategy'
import { ConfigService } from '../services'

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
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.schema,
      logging: config.logging,
      namingStrategy: new NamingStrategy(),
      migrationsRun: true,
      multipleStatements: true
    })

    try {
      await createConnection(options)
    } catch(e) {
      console.error(e);
      this.reconnectWithDelay(5000)
    }
  }

  async reconnectWithDelay (delay: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, delay));
    await this.connect()
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
