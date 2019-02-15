import { CreateDateColumn } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { ObjectType } from 'type-graphql'

/**
 * Common ancestor for entities keeping track of created and updated dates.
 *
 * Created and updated dates are generated in database thus they are read-only for the api.
 * @abstract
 * @class
 */
@ObjectType()
export abstract class BaseEntry extends BaseEntity {
  @CreateDateColumn({ readonly: true })
  createdAt: Date | null = null

  @CreateDateColumn({ readonly: true })
  updatedAt: Date | null = null
}
