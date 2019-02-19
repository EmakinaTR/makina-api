import * as fs from 'fs'
import _ from 'lodash'

/**
 * Singleton service class that loads json configuration files.
 * @class
 */
class ConfigService {
  private _config: any = {}

  public constructor () {
    const rootDir = process.cwd()
    const configBasePath = `${rootDir}/config/config.json`
    if (fs.existsSync(configBasePath)) {
      const configBase = require(`${rootDir}/config/config.json`) // eslint-disable-line
      if (configBase) {
        this._config = _.merge(this._config, configBase)
      }
    }
    const configStagePath = `${rootDir}/config/config.${process.env.NODE_ENV || 'dev'}.json`
    if (fs.existsSync(configStagePath)) {
      const configStage = require(configStagePath) // eslint-disable-line
      if (configStage) {
        this._config = _.merge(this._config, configStage)
      }
    }
  }

  /**
   * Reads a key from configuration.
   * @param key - A field or a path.
   */
  public get (key: string): any {
    return _.get(this._config, key)
  }
}

export default new ConfigService()
