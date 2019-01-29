import { schema } from '..'
import { graphql } from 'graphql'
import { createRepositoryMock, createProfile } from '../../data/entities/__mocks__/'

describe('Place - GraphQL Definitions and Resolvers', () => {
  const fake: any = {}

  beforeAll(async () => {
    createRepositoryMock(fake)
  })

  it('should create a profile.', async () => {
    const profile = createProfile()
    let email = profile.email
    let birthDate = profile.birthDate
    let birthDateStr = birthDate!.toISOString()

    fake.data = { Profile: [profile] }
    const expected: any = { 'id': profile.id, 'email': email, 'birthDate': birthDate }

    const gql = `
      mutation {
        createProfile(input: { email: "${email}", birthDate: "${birthDateStr}" }) {
          id
          email
          birthDate
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'createProfile': expected })
  })

  it('should delete a profile.', async () => {
    fake.data = { Profile: [ { 'raw': { 'affectedRows': 1 } } ] }
    const expected: any = { 'raw': { 'affectedRows': 1 } }
    const gql = `
      mutation {
        deleteProfile(id: 2) {
          raw {
            affectedRows
          }
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'deleteProfile': expected })
  })
})
