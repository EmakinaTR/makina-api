import { ArgsType, Field, Int } from 'type-graphql'

@ArgsType()
export class ListArgs {
  @Field(type => Int)
  first: number = 0

  @Field(type => Int)
  offset: number = 0
}
