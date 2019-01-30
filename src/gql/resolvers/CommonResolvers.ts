import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

export const common = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue (value) {
      return new Date(value) // value from the client
    },
    serialize (value) {
      return value // value sent to the client
    },
    parseLiteral (ast) {
      // value from the client
      if (ast.kind === Kind.INT) {
        return new Date(ast.value)
      } else if (ast.kind === Kind.STRING) {
        return new Date(ast.value)
      }
      return null
    }
  })
}
