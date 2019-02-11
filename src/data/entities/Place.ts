import { Entity, Column } from 'typeorm'
import { BaseEntry } from './BaseEntry'
import { PlaceEnum } from '../enums/PlaceEnum'
import { Field, ObjectType } from 'type-graphql'

/**
 * Entity class mapping rows in 'place' table.
 * @class
 */
@Entity()
@ObjectType()
export class Place extends BaseEntry {
  @Column({ type: 'varchar' })
  @Field(type => String, { nullable: true })
  name: string | null = null

  @Column({ type: 'enum', enum: PlaceEnum, default: PlaceEnum.city })
  @Field(type => PlaceEnum, { nullable: true })
  type: PlaceEnum | null = PlaceEnum.city
}
