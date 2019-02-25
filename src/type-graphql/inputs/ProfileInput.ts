import { Field, InputType } from 'type-graphql'
import { Profile } from '../../data/entities' // eslint-disable-line no-unused-vars
import { RelationIdInput } from './RelationIdInput'

@InputType()
export class ProfileInput implements Partial<Profile> {
  @Field(type => String, { nullable: true })
  public email?: string

  @Field(type => String, { nullable: true })
  public firstName?: string

  @Field(type => String, { nullable: true })
  public lastName?: string

  @Field(type => Date, { nullable: true })
  public birthDate?: Date

  @Field(type => String, { nullable: true })
  public address?: string

  @Field(type => String, { nullable: true })
  public phone?: string

  @Field(type => RelationIdInput, { nullable: true })
  public place?: any
}
