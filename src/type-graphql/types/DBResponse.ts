import { Field, ObjectType, Int } from 'type-graphql'

@ObjectType()
export class DBResponseRaw {
  @Field(type => Int, { nullable: true })
  fieldCount?: number

  @Field(type => Int, { nullable: true })
  affectedRows?: number

  @Field(type => String, { nullable: true })
  insert?: string

  @Field(type => Int, { nullable: true })
  serverStatus?: number

  @Field(type => Int, { nullable: true })
  warningStatus?: number
}

@ObjectType()
export class DBResponse {
  @Field(type => DBResponseRaw, { nullable: true })
  raw?: DBResponseRaw
}
