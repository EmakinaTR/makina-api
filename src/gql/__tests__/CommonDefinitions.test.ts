import { schema } from '..'
import { graphql } from 'graphql'
import { createRepositoryMock } from '../../data/entities/__mocks__/'

describe('Place - GraphQL Definitions and Resolvers', () => {
  beforeAll(async () => {
    createRepositoryMock()
  })

  it('should create "a@a.com".', async () => {
    const gql = `
      mutation {
        createProfile(input: { email: "a@a.com", birthDate: "1988-06-08"}) {
          id
          email
          birthDate
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'createProfile': { 'id': 1, 'email': 'a@a.com', 'birthDate': new Date('1988-06-08') } })
  })
})
