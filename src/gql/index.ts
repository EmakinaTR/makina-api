import { merge } from 'lodash'
import { makeExecutableSchema } from 'apollo-server-koa'
import {
  typeDefs as Common,
  resolvers as commonResolvers
} from './Common'
import {
  typeDefs as Place,
  resolvers as placeResolvers
} from './Place'
import {
  typeDefs as Profile,
  resolvers as profileResolvers
} from './Profile'

const Base = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`
const resolvers = {}

export const schema = makeExecutableSchema({
  typeDefs: [ Base, Common, Place, Profile ],
  resolvers: merge(resolvers, commonResolvers, placeResolvers, profileResolvers)
})
