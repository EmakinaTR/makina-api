import * as fs from 'fs'
import _ from 'lodash'
import EnvToJSON from './EnvToJSON'

/**
 * Singleton service class that loads json configuration files.
 * @class
 */
class ConfigService {
  private _config: any = {}

  constructor () {
    const rootDir = process.cwd()

    // Read and merge shared config
    const configBasePath = `${rootDir}/config/config.json`
    if (fs.existsSync(configBasePath)) {
      const configBase = require(`${rootDir}/config/config.json`)
      if (configBase) {
        this._config = _.merge(this._config, configBase)
      }
    }

    // Read and merge staging config
    const configStagePath = `${rootDir}/config/config.${process.env.NODE_ENV || 'dev'}.json`
    if (fs.existsSync(configStagePath)) {
      const configStage = require(configStagePath)
      if (configStage) {
        this._config = _.merge(this._config, configStage)
      }
    }

    // Read and merge .env to config.json
    this._config = _.merge(this._config, EnvToJSON())
  }

  /**
   * Reads a key from configuration.
   * @param key - A field or a path.
   */
  get (key: string): any {
    return _.get(this._config, key)
  }
}

export default new ConfigService()
