import { Entity, Column } from 'typeorm'
import { BaseEntry } from './BaseEntry'
import { Field, ObjectType, registerEnumType } from 'type-graphql'

export declare enum PlaceType {
  country = 'country', // eslint-disable-line
  state = 'state', // eslint-disable-line
  region = 'region', // eslint-disable-line
  city = 'city', // eslint-disable-line
  district = 'district', // eslint-disable-line
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
  @Field()
  name: string | null = null

  @Column({ type: 'enum', enum: PlaceType, default: PlaceType.city })
  @Field(type => PlaceType)
  type: PlaceType | null = PlaceType.city
}
