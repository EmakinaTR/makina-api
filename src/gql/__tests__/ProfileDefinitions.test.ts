import { schema } from '..'
import { graphql } from 'graphql'
import { createRepositoryMock } from '../../data/entities/__mocks__/'

describe('Profile - GraphQL Definitions and Resolvers', () => {
  beforeAll(async () => {
    createRepositoryMock()
  })

  it('should fetch all profiles as empty list.', async () => {
    const gql = `
      query {
        profiles {
          id
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'profiles': [] })
  })

  it('should create "a@a.com".', async () => {
    const gql = `
      mutation {
        createProfile(input: { email: "a@a.com"}) {
          id
          email
          firstName
          lastName
          birthDate
          phone
          address
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'createProfile': { 'id': 1, 'email': 'a@a.com', 'firstName': null, 'lastName': null, 'birthDate': null, 'phone': null, 'address': null } })
  })

  it('should fetch "a@a.com".', async () => {
    const gql = `
      query {
        profile(id: 1) {
          email
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'profile': { 'email': 'a@a.com' } })
  })

  it('should create "İzmir".', async () => {
    const gql = `
      mutation {
        createPlace(input: { name: "İzmir", type: city}) {
          id
          name
          type
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'createPlace': { 'id': 1, 'name': 'İzmir', 'type': 'city' } })
  })

  it('should create "b@b.com".', async () => {
    const gql = `
      mutation {
        createProfile(input: { email: "b@b.com", place_id: 1 }) {
          id
          email
          place {
            id
            name
          }
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'createProfile': { 'id': 2, 'email': 'b@b.com', 'place': { 'id': 1, 'name': 'İzmir' } } })
  })

  it('should update "b@b.com" to "c@c.com".', async () => {
    const gql = `
      mutation {
        updateProfile(id: 2, input: { email: "c@c.com" }) {
          id
          email
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'updateProfile': { 'id': 2, 'email': 'c@c.com' } })
  })

  it('should fetch ["a@a.com", "c@c.com"].', async () => {
    const gql = `
      query {
        profiles {
          email
          place {
            name
          }
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'profiles': [{ 'email': 'a@a.com', 'place': null }, { 'email': 'c@c.com', 'place': { 'name': 'İzmir' } }] })
  })

  it('should delete "c@c.com".', async () => {
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
    expect(data).toEqual({ 'deleteProfile': { 'raw': { 'affectedRows': 1 } } })
  })

  it('should not delete "c@c.com" again.', async () => {
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
    expect(data).toEqual({ 'deleteProfile': { 'raw': { 'affectedRows': 0 } } })
  })

  it('should not fetch "c@c.com".', async () => {
    const gql = `
      query {
        profile(id: 2) {
          email
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'profile': null })
  })

  it('should fetch ["a@a.com"].', async () => {
    const gql = `
      query {
        profiles {
          id
          email
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'profiles': [{ 'id': 1, 'email': 'a@a.com' }] })
  })
})
