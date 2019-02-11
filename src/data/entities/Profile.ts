import { Entity, Column, ManyToOne } from 'typeorm'
import { BaseEntry } from './BaseEntry'
import { Place } from './Place'
import { Field, ObjectType } from 'type-graphql'

/**
 * Entity class mapping rows in 'profile' table
 * @class
 */
@Entity()
@ObjectType()
export class Profile extends BaseEntry {
  @Column({ type: 'varchar' })
  @Field(type => String, { nullable: true })
  email: string | null = null

  @Column({ type: 'varchar' })
  @Field(type => String, { nullable: true })
  firstName: string | null = null

  @Column({ type: 'varchar' })
  @Field(type => String, { nullable: true })
  lastName: string | null = null

  @Column({ type: 'varchar' })
  @Field(type => Date, { nullable: true })
  birthDate: Date | null = null

  @Column({ type: 'varchar' })
  @Field(type => String, { nullable: true })
  address: string | null = null

  @Column({ type: 'varchar' })
  @Field(type => String, { nullable: true })
  phone: string | null = null

  @Column({ type: 'bigint' })
  placeId: number | null = null

  @ManyToOne(type => Place)
  @Field(type => Place, { nullable: true })
  place: Place | null = null
}
