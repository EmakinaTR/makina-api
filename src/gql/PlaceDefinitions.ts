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
    id: Int
    name: String
    type: PlaceType
  }

  extend type Query {
    place(id: Int!): Place
    places(first: Int, offset: Int): [Place]
  }
  extend type Mutation {
    createPlace(input: PlaceInput): Place
    updatePlace(id: Int!, input: PlaceInput): Place
    deletePlace(id: Int!): DBResponse
  }
`

export const resolvers = {
  Query: {
    place: (_: any, { id }: any) => {
      return PlaceController.getInstance().getOne(id)
    },
    places: (_: any, { first, offset }: any) => {
      return PlaceController.getInstance().getAll(first, offset)
    }
  },
  Mutation: {
    createPlace: (_: any, { input }: any) => {
      return PlaceController.getInstance().create(input)
    },
    updatePlace: async (_: any, { id, input }: any) => {
      return PlaceController.getInstance().update(id, input)
    },
    deletePlace: (_: any, { id }: any) => {
      return PlaceController.getInstance().remove(id)
    }
  }
}
