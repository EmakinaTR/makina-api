import * as dotenv from 'dotenv'

/**
 * Reads .env file if exists and returns file's content as an object.
 */
export default function (): object {
  /**
   * If given string is composed of numbers, than converts it to number type.
   * @param val - Any string
   */
  function converToNumberIfItIsNumber (val: string): any {
    return /^\d*$/.test(val) ? Number(val) : val
  }

  let obj: any = {}
  let envVars: any = dotenv.config()
  if ('parsed' in envVars) {
    envVars = envVars['parsed']
    let keys: string[] = Object.keys(envVars)

    for (let i: number = 0, ii: number = keys.length; i !== ii; i++) {
      envVars[keys[i]] = converToNumberIfItIsNumber(envVars[keys[i]])

      let lowerKey: string = keys[i].toLowerCase()
      let key: string = lowerKey.substring(0, lowerKey.indexOf('_'))
      let subKey: string = lowerKey.substring(lowerKey.indexOf('_') + 1)
      obj[key] = obj[key] || {}
      obj[key][subKey] = envVars[keys[i]]
    }
  }
  return obj
}
