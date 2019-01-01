import _ from 'lodash'
import { createConnection, getConnection, getConnectionOptions } from 'typeorm'
import { NamingStrategy } from './NamingStrategy'
import { ConfigService } from '../services'

class Database {
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
    await createConnection(options)
  }

  async disconnect (): Promise<void> {
    const connection = getConnection()
    if (!connection) {
      return
    }
    await connection.close()
  }
}

export default new Database()
