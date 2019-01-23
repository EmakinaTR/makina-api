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
  input PlaceInput {
    name: String
    type: PlaceType
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
    createPlace(input: PlaceInput): Place
    updatePlace(id: ID!, input: PlaceInput): Place
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
    createPlace: (_: any, { input }: any) => {
      const repository = getRepository(Place)
      const place = new Place()
      repository.merge(place, input)
      return repository.save(place)
    },
    updatePlace: async (_: any, { id, input }: any) => {
      const repository = getRepository(Place)
      const place = await repository.findOne(id)
      if (!place) {
        throw new Error(`Couldn’t find place with id ${id}`)
      }
      repository.merge(place, input)
      return repository.save(place)
    },
    deletePlace: (_: any, { id }: any) => {
      return getRepository(Place).delete(id)
    }
  }
}
