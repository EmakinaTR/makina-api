import { PlaceController, ProfileController } from '../controllers'

export const typeDefs = `
  input ProfileInput {
    email: String
    firstName: String
    lastName: String
    birthDate: Date
    address: String
    phone: String
    place_id: Int
  }
  type Profile {
    id: Int
    email: String
    firstName: String
    lastName: String
    birthDate: Date
    address: String
    phone: String
    place: Place
  }

  extend type Query {
    profile(id: Int!): Profile
    profiles(first: Int, offset: Int, after: Int): [Profile]
  }
  extend type Mutation {
    createProfile(input: ProfileInput): Profile
    updateProfile(id: Int!, input: ProfileInput): Profile
    deleteProfile(id: Int!): DBResponse
  }
`

export const resolvers = {
  Profile: {
    place (_: any) {
      return PlaceController.getInstance().getOne(_.place_id)
    }
  },
  Query: {
    profile: (_: any, { id }: any) => {
      return ProfileController.getInstance().getOne(id)
    },
    profiles: (_: any, { first, offset }: any) => {
      return ProfileController.getInstance().getAll(first, offset)
    }
  },
  Mutation: {
    createProfile: (_: any, { input }: any) => {
      return ProfileController.getInstance().create(input)
    },
    updateProfile: async (_: any, { id, input }: any) => {
      return ProfileController.getInstance().update(id, input)
    },
    deleteProfile: (_: any, { id }: any) => {
      return ProfileController.getInstance().remove(id)
    }
  }
}
