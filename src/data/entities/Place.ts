import { Entity, Column } from 'typeorm'
import { BaseEntry } from './BaseEntry'
import { Field, ObjectType, registerEnumType } from 'type-graphql'

export enum PlaceType {
  country = 'country', // eslint-disable-line no-unused-vars
  state = 'state', // eslint-disable-line no-unused-vars
  region = 'region', // eslint-disable-line no-unused-vars
  city = 'city', // eslint-disable-line no-unused-vars
  district = 'district', // eslint-disable-line no-unused-vars
}

// required for type-graphql
registerEnumType(PlaceType, {
  name: 'PlaceType'
})

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
