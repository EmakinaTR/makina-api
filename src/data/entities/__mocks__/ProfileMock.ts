import { Profile } from '../'
import { createPlace } from './PlaceMock'
import * as faker from 'faker'

export function createProfile (): Profile {
  const profile = new Profile()
  profile.id = faker.random.number(100000)
  profile.email = faker.internet.email()
  profile.firstName = faker.name.firstName()
  profile.lastName = faker.name.lastName()
  profile.address = faker.address.streetAddress()
  profile.phone = faker.phone.phoneNumber()
  profile.birthDate = faker.date.past(20)
  profile.place = createPlace()
  profile.placeId = profile.place.id
  return profile
}
