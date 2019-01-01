import * as fs from 'fs'
import _ from 'lodash'

class ConfigService {
  private _config: any = {}

  constructor () {
    const rootDir = process.cwd()
    const configBasePath = `${rootDir}/config/config.json`
    if (fs.existsSync(configBasePath)) {
      const configBase = require(`${rootDir}/config/config.json`)
      if (configBase) {
        this._config = _.merge(this._config, configBase)
      }
    }
    const configStagePath = `${rootDir}/config/config.${process.env.NODE_ENV || 'dev'}.json`
    if (fs.existsSync(configStagePath)) {
      const configStage = require(configStagePath)
      if (configStage) {
        this._config = _.merge(this._config, configStage)
      }
    }
  }

  get (key: string): any {
    return _.get(this._config, key)
  }
}

export default new ConfigService()
