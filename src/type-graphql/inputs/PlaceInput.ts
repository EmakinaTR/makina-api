import { Field, InputType } from 'type-graphql'
import { Place } from '../../data/entities' // eslint-disable-line no-unused-vars
import { PlaceEnum } from '../../data/enums' // eslint-disable-line no-unused-vars

@InputType()
export class PlaceInput implements Partial<Place> {
  @Field(type => String, { nullable: true })
  public name?: string

  @Field(type => PlaceEnum, { nullable: true })
  public type?: PlaceEnum
}
