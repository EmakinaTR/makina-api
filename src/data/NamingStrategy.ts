// Credits to @recurrence
// https://gist.github.com/recurrence/b6a4cb04a8ddf42eda4e4be520921bd2

import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm' // eslint-disable-line no-unused-vars
import { snakeCase } from 'typeorm/util/StringUtils'

/**
 * Strategy class for converting UpperCammelCase entity and field names to snake_case.
 * @class
 */
export class NamingStrategy extends DefaultNamingStrategy
  implements NamingStrategyInterface {
  public tableName (className: string, customName: string): string {
    return customName || snakeCase(className)
  }

  public columnName (
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[]
  ): string {
    return (
      snakeCase(embeddedPrefixes.join('_')) +
      (customName || snakeCase(propertyName))
    )
  }

  public relationName (propertyName: string): string {
    return snakeCase(propertyName)
  }

  public joinColumnName (relationName: string, referencedColumnName: string): string {
    return snakeCase(relationName + '_' + referencedColumnName)
  }

  public joinTableName (
    firstTableName: string,
    secondTableName: string,
    firstPropertyName: string,
    secondPropertyName: string
  ): string {
    return snakeCase(
      firstTableName +
        '_' +
        firstPropertyName.replace(/\./gi, '_') +
        '_' +
        secondTableName
    )
  }

  public joinTableColumnName (
    tableName: string,
    propertyName: string,
    columnName?: string
  ): string {
    return snakeCase(
      tableName + '_' + (columnName || propertyName)
    )
  }

  public classTableInheritanceParentColumnName (
    parentTableName: any,
    parentTableIdPropertyName: any
  ): string {
    return snakeCase(parentTableName + '_' + parentTableIdPropertyName)
  }
}
