import { Field, ObjectType, Int } from 'type-graphql'

@ObjectType()
export class DBResponseRaw {
  @Field(type => Int, { nullable: true })
  public fieldCount?: number

  @Field(type => Int, { nullable: true })
  public affectedRows?: number

  @Field(type => String, { nullable: true })
  public insert?: string

  @Field(type => Int, { nullable: true })
  public serverStatus?: number

  @Field(type => Int, { nullable: true })
  public warningStatus?: number
}

@ObjectType()
export class DBResponse {
  @Field(type => DBResponseRaw, { nullable: true })
  public raw?: DBResponseRaw
}
