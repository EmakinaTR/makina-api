import { ArgsType, Field, Int } from 'type-graphql'

@ArgsType()
export class ListArgs {
  @Field(type => Int, { nullable: true })
  first: number | undefined

  @Field(type => Int, { nullable: true })
  offset: number | undefined
}
