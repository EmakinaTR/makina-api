import { getRepository } from 'typeorm'
import { Place } from '../data/entities'

export const typeDefs = `
  enum PlaceType {
    country
    state
    region
    city
    district
  }
  type Place {
    id: ID
    name: String
    type: PlaceType
  }

  extend type Query {
    place(id: ID!): Place
    places: [Place]
  }
  extend type Mutation {
    createPlace(name: String!, type: PlaceType): Place
    updatePlace(id: ID!, name: String, type: PlaceType): Place
    deletePlace(id: ID!): DBResponse
  }
`
export const resolvers = {
  Query: {
    place: (_: any, { id }: any) => {
      return getRepository(Place).findOne(id)
    },
    places: () => {
      return getRepository(Place).find()
    }
  },
  Mutation: {
    createPlace: (_: any, { name, type }: any) => {
      const place = new Place()
      place.name = name
      place.type = type || place.type
      return getRepository(Place).save(place)
    },
    updatePlace: async (_: any, { id, name, type }: any) => {
      const place = await getRepository(Place).findOne(id)
      if (!place) {
        throw new Error(`Couldn’t find place with id ${id}`)
      }
      place.name = name || place.name
      place.type = type || place.type
      return getRepository(Place).save(place)
    },
    deletePlace: (_: any, { id }: any) => {
      return getRepository(Place).delete(id)
    }
  }
}
