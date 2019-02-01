import { PrimaryGeneratedColumn } from 'typeorm'
import { Field, InterfaceType, Int } from 'type-graphql'

/**
 * Common ancestor for all entities having auto-incremented id key.
 * @abstract
 * @class
 */
@InterfaceType()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(type => Int)
  id: number = 0
}
