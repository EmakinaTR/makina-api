import { registerEnumType } from 'type-graphql'

export enum PlaceEnum {
  country = 'country', // eslint-disable-line no-unused-vars
  state = 'state', // eslint-disable-line no-unused-vars
  region = 'region', // eslint-disable-line no-unused-vars
  city = 'city', // eslint-disable-line no-unused-vars
  district = 'district', // eslint-disable-line no-unused-vars
}

// required for type-graphql
registerEnumType(PlaceEnum, {
  name: 'PlaceEnum'
})
