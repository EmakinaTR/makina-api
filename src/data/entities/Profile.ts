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
  public email: string | null = null

  @Column({ type: 'varchar' })
  @Field(type => String, { nullable: true })
  public firstName: string | null = null

  @Column({ type: 'varchar' })
  @Field(type => String, { nullable: true })
  public lastName: string | null = null

  @Column({ type: 'varchar' })
  @Field(type => Date, { nullable: true })
  public birthDate: Date | null = null

  @Column({ type: 'varchar' })
  @Field(type => String, { nullable: true })
  public address: string | null = null

  @Column({ type: 'varchar' })
  @Field(type => String, { nullable: true })
  public phone: string | null = null

  @Column({ type: 'bigint' })
  public placeId: number | null = null

  @ManyToOne(type => Place)
  @Field(type => Place, { nullable: true })
  public place: Place | null = null
}
