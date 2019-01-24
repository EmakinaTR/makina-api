import { PlaceController, ProfileController } from '../controllers'

export const typeDefs = `
  input ProfileInput {
    email: String
    firstName: String
    lastName: String
    birthDate: Date
    address: String
    phone: String
    place: ID
  }
  type Profile {
    id: ID
    email: String
    firstName: String
    lastName: String
    birthDate: Date
    address: String
    phone: String
    place: Place
  }

  extend type Query {
    profile(id: ID!): Profile
    profiles(first: Int, offset: Int, after: ID): [Profile]
  }
  extend type Mutation {
    createProfile(input: ProfileInput): Profile
    updateProfile(id: ID!, input: ProfileInput): Profile
    deleteProfile(id: ID!): DBResponse
  }
`

export const resolvers = {
  Profile: {
    place (_: any) {
      return new PlaceController().getOne(_.profile_id)
    }
  },
  Query: {
    profile: (_: any, { id }: any) => {
      return new ProfileController().getOne(id)
    },
    profiles: (_: any, { first, offset }: any) => {
      return new ProfileController().getAll(first, offset)
    }
  },
  Mutation: {
    createProfile: (_: any, { input }: any) => {
      return new ProfileController().create(input)
    },
    updateProfile: async (_: any, { id, input }: any) => {
      return new ProfileController().update(id, input)
    },
    deleteProfile: (_: any, { id }: any) => {
      return new ProfileController().remove(id)
    }
  }
}
