import { getRepository } from 'typeorm'
import { Profile } from '../data/entities'

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
    profiles: [Profile]
  }
  extend type Mutation {
    createProfile(input: ProfileInput): Profile
    updateProfile(id: ID!, input: ProfileInput): Profile
    deleteProfile(id: ID!): DBResponse
  }
`

export const resolvers = {
  Query: {
    profile: (_: any, { id }: any) => {
      return getRepository(Profile).findOne(id, { relations: ['place'] })
    },
    profiles: () => {
      return getRepository(Profile).find({ relations: ['place'] })
    }
  },
  Mutation: {
    createProfile: async (_: any, { input }: any) => {
      const repository = getRepository(Profile)
      const profile = new Profile()
      repository.merge(profile, input)
      return repository.save(profile)
    },
    updateProfile: async (_: any, { id, input }: any) => {
      const repository = getRepository(Profile)
      const profile = await repository.findOne(id)
      if (!profile) {
        throw new Error(`Couldn’t find profile with id ${id}`)
      }
      repository.merge(profile, input)
      console.log(profile, input)
      return repository.save(profile)
    },
    deleteProfile: (_: any, { id }: any) => {
      return getRepository(Profile).delete(id)
    }
  }
}
