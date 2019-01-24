import { PlaceController } from '../controllers'

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
    places(first: Int, offset: Int): [Place]
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
      return new PlaceController().getOne(id)
    },
    places: (_: any, { first, offset }: any) => {
      return new PlaceController().getAll(first, offset)
    }
  },
  Mutation: {
    createPlace: (_: any, { input }: any) => {
      return new PlaceController().create(input)
    },
    updatePlace: async (_: any, { id, input }: any) => {
      return new PlaceController().update(id, input)
    },
    deletePlace: (_: any, { id }: any) => {
      return new PlaceController().remove(id)
    }
  }
}
