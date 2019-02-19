import { PrimaryGeneratedColumn } from 'typeorm'
import { Field, ObjectType, Int } from 'type-graphql'

/**
 * Common ancestor for all entities having auto-incremented id key.
 * @abstract
 * @class
 */
@ObjectType()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(type => Int)
  public id: number = 0
}
