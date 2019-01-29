import { schema } from '..'
import { graphql } from 'graphql'
import { createRepositoryMock, createPlace } from '../../data/entities/__mocks__/'

describe('Place - GraphQL Definitions and Resolvers', () => {
  const fake: any = {}

  beforeAll(async () => {
    createRepositoryMock(fake)
  })

  it('should fetch all places as empty list.', async () => {
    fake.data = { Place: [] }
    const expected: any = []
    const gql = `
      query {
        places {
          id
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'places': expected })
  })

  it('should fetch all places', async () => {
    const placeA = createPlace()
    const placeB = createPlace()

    fake.data = { Place: [placeA, placeB] }
    const expected: any = [
      { 'name': placeA.name },
      { 'name': placeB.name }]
    const gql = `
      query {
        places {
          name
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'places': expected })
  })

  it('should fetch a place.', async () => {
    const place = createPlace()
    let id = place.id

    fake.data = { Place: [place] }
    const expected: any = { 'name': place.name }
    const gql = `
      query {
        place(id: ${id}) {
          name
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'place': expected })
  })

  it('should not fetch a place.', async () => {
    fake.data = { Place: [] }
    const expected: any = null
    const gql = `
      query {
        place(id: 1) {
          name
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'place': expected })
  })

  it('should create a place.', async () => {
    const place = createPlace()
    let name = place.name
    let type = place.type

    fake.data = { Place: [place] }
    const expected: any = { 'id': place.id, 'name': name, 'type': type }
    const gql = `
      mutation {
        createPlace(input: { name: "${name}", type: ${type}}) {
          id
          name
          type
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'createPlace': expected })
  })

  it('should update a place.', async () => {
    const place = createPlace()
    let id = place.id
    let name = 'İzmir'
    place.name = name

    fake.data = { Place: [place] }
    const expected: any = { 'id': id, 'name': name }
    const gql = `
      mutation {
        updatePlace(id: ${id}, input: { name: "${name}" }) {
          id
          name
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'updatePlace': expected })
  })

  it('should not update a place.', async () => {
    fake.data = { Place: [] }
    const expected: any = null
    const gql = `
      mutation {
        updatePlace(id: 1, input: { name: "İzmir" }) {
          id
          name
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'updatePlace': expected })
  })

  it('should delete a place.', async () => {
    fake.data = { Place: [ { 'raw': { 'affectedRows': 1 } } ] }
    const expected: any = { 'raw': { 'affectedRows': 1 } }
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
    expect(data).toEqual({ 'deletePlace': expected })
  })

  it('should not delete.', async () => {
    fake.data = { Place: [ { 'raw': { 'affectedRows': 0 } } ] }
    const expected: any = { 'raw': { 'affectedRows': 0 } }
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
    expect(data).toEqual({ 'deletePlace': expected })
  })
})
