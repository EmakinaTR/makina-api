import { makeExecutableSchema } from 'apollo-server-koa'

import { resolvers } from './resolvers'
import { typeDefs } from './types'

export const schema = makeExecutableSchema({
  'typeDefs': typeDefs,
  'resolvers': resolvers
})
