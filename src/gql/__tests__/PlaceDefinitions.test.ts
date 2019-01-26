import { schema } from '..'
import { graphql } from 'graphql'
import { createRepositoryMock } from '../../data/entities/__mocks__/'

describe('Place - GraphQL Definitions and Resolvers', () => {
  beforeAll(async () => {
    createRepositoryMock()
  })

  it('should fetch all places as empty list.', async () => {
    const gql = `
      query {
        places {
          id
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'places': [] })
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

  it('should fetch "İzmir".', async () => {
    const gql = `
      query {
        place(id: 1) {
          name
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'place': { 'name': 'İzmir' } })
  })

  it('should create "Gaziemir".', async () => {
    const gql = `
      mutation {
        createPlace(input: { name: "Gaziemir", type: district}) {
          id
          name
          type
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'createPlace': { 'id': 2, 'name': 'Gaziemir', 'type': 'district' } })
  })

  it('should update "Gaziemir" to "Ankara".', async () => {
    const gql = `
      mutation {
        updatePlace(id: 2, input: { name: "Ankara", type: city}) {
          id
          name
          type
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'updatePlace': { 'id': 2, 'name': 'Ankara', 'type': 'city' } })
  })

  it('should fetch ["İzmir", "Ankara"].', async () => {
    const gql = `
      query {
        places {
          id
          name
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'places': [{ 'id': 1, 'name': 'İzmir' }, { 'id': 2, 'name': 'Ankara' }] })
  })

  it('should delete "Ankara".', async () => {
    const gql = `
      mutation {
        deletePlace(id: 2) {
          raw {
            affectedRows
          }
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'deletePlace': { 'raw': { 'affectedRows': 1 } } })
  })

  it('should not delete "Ankara" again.', async () => {
    const gql = `
      mutation {
        deletePlace(id: 2) {
          raw {
            affectedRows
          }
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'deletePlace': { 'raw': { 'affectedRows': 0 } } })
  })

  it('should not fetch "Ankara".', async () => {
    const gql = `
      query {
        place(id: 2) {
          name
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'place': null })
  })

  it('should fetch ["İzmir"].', async () => {
    const gql = `
      query {
        places {
          id
          name
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'places': [{ 'id': 1, 'name': 'İzmir' }] })
  })
})
