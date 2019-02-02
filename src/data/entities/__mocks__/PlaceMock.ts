import { Place } from '../'
import * as faker from 'faker'

export function createPlace () {
  const place = new Place()
  place.id = faker.random.number(100000)
  place.name = faker.address.city()
  return place
}
