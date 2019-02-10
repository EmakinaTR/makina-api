import { Field, InputType } from 'type-graphql'
import { Profile } from '../../data/entities' // eslint-disable-line no-unused-vars
import { RelationIdInput } from './RelationIdInput'

@InputType()
export class ProfileInput implements Partial<Profile> {
  @Field(type => String, { nullable: true })
  email?: string

  @Field(type => String, { nullable: true })
  firstName?: string

  @Field(type => String, { nullable: true })
  lastName?: string

  @Field(type => Date, { nullable: true })
  birthDate?: Date

  @Field(type => String, { nullable: true })
  address?: string

  @Field(type => String, { nullable: true })
  phone?: string

  @Field(type => RelationIdInput, { nullable: true })
  place?: any
}
