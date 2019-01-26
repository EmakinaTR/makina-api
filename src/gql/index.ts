import { merge } from 'lodash'
import { makeExecutableSchema } from 'apollo-server-koa'
import {
  typeDefs as Common,
  resolvers as commonResolvers
} from './CommonDefinitions'
import {
  typeDefs as Place,
  resolvers as placeResolvers
} from './PlaceDefinitions'
import {
  typeDefs as Profile,
  resolvers as profileResolvers
} from './ProfileDefinitions'

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
