import { Entity, Column } from 'typeorm'
import { BaseEntry } from './BaseEntry'
import { PlaceType } from './PlaceType'
import { Field, ObjectType } from 'type-graphql'

/**
 * Entity class mapping rows in 'place' table.
 * @class
 */
@Entity()
@ObjectType()
export class Place extends BaseEntry {
  @Column({ type: 'varchar' })
  @Field(type => String)
  name: string | null = null

  @Column({ type: 'enum', enum: PlaceType })
  @Field(type => PlaceType)
  type: PlaceType | null = PlaceType.city
}
