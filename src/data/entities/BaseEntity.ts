import { PrimaryGeneratedColumn } from 'typeorm'

/**
 * Common ancestor for all entities having auto-incremented id key.
 * @abstract
 * @class
 */
export abstract class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number = 0
}
