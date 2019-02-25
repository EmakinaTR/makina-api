import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class RelationIdInput {
  @Field(type => Int, { nullable: true })
  public id?: number
}
