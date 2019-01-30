import { schema } from '../../'
import { graphql } from 'graphql'
import { createRepositoryMock, createProfile } from '../../../data/entities/__mocks__/'

describe('Profile - GraphQL Definitions and Resolvers', () => {
  const fake: any = {}

  beforeAll(async () => {
    createRepositoryMock(fake)
  })

  it('should fetch all profiles as empty list.', async () => {
    fake.data = { Profile: [] }
    const expected: any = []
    const gql = `
      query {
        profiles {
          id
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'profiles': expected })
  })

  it('should fetch all profiles', async () => {
    const profileA = createProfile()
    const profileB = createProfile()

    fake.data = { Profile: [profileA, profileB], Place: [profileA!.place, profileB!.place] }
    const expected: any = [
      { 'email': profileA.email, 'place': { 'name': profileA!.place!.name } },
      { 'email': profileB.email, 'place': { 'name': profileB!.place!.name } }]
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
    expect(data).toEqual({ 'profiles': expected })
  })

  it('should fetch a profile.', async () => {
    const profile = createProfile()
    let id = profile.id

    fake.data = { Profile: [profile] }
    const expected: any = { 'email': profile.email }
    const gql = `
      query {
        profile(id: ${id}) {
          email
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'profile': expected })
  })

  it('should not fetch a profile.', async () => {
    fake.data = { Profile: [] }
    const expected: any = null
    const gql = `
      query {
        profile(id: 1) {
          email
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'profile': expected })
  })

  it('should create a profile.', async () => {
    const profile = createProfile()
    let email = profile.email
    let firstName = profile.firstName
    let lastName = profile.lastName
    let birthDate = profile.birthDate
    let birthDateStr = birthDate!.toISOString()
    let phone = profile.phone
    let address = profile.address

    fake.data = { Profile: [profile] }
    const expected: any = { 'id': profile.id, 'email': email, 'firstName': firstName, 'lastName': lastName, 'birthDate': birthDate, 'phone': phone, 'address': address }

    const gql = `
      mutation {
        createProfile(input: { email: "${email}", firstName: "${firstName}", lastName: "${lastName}", birthDate: "${birthDateStr}", phone: "${phone}", address: "${address}"}) {
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
    expect(data).toEqual({ 'createProfile': expected })
  })

  it('should create a profile with place.', async () => {
    const profile = createProfile()
    let email = profile.email
    let firstName = profile.firstName
    let lastName = profile.lastName
    let birthDate = profile.birthDate
    let birthDateStr = birthDate != null ? birthDate.toISOString() : null
    let phone = profile.phone
    let address = profile.address
    let place = profile.place
    let placeId = place!.id

    fake.data = { Profile: [profile], Place: [profile.place] }
    const expected: any = { 'id': profile.id, 'email': email, 'firstName': firstName, 'lastName': lastName, 'birthDate': birthDate, 'phone': phone, 'address': address, 'place': { 'id': placeId, 'name': place!.name, 'type': place!.type } }

    const gql = `
      mutation {
        createProfile(input: { email: "${email}", firstName: "${firstName}", lastName: "${lastName}", birthDate: "${birthDateStr}", phone: "${phone}", address: "${address}", place: {id: ${placeId}}}) {
          id
          email
          firstName
          lastName
          birthDate
          phone
          address
          place {
            id
            name
            type
          }
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'createProfile': expected })
  })

  it('should update a profile.', async () => {
    const profile = createProfile()
    let id = profile.id
    let email = 'sample@example.com'
    profile.email = email

    fake.data = { Profile: [profile] }
    const expected: any = { 'id': id, 'email': email }
    const gql = `
      mutation {
        updateProfile(id: ${id}, input: { email: "${email}" }) {
          id
          email
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'updateProfile': expected })
  })

  it('should not update a profile.', async () => {
    fake.data = { Profile: [] }
    const expected: any = null
    const gql = `
      mutation {
        updateProfile(id: 1, input: { email: "a@a.com" }) {
          id
          email
        }
      }
    `

    const { data } = await graphql(schema, gql, {}, {})
    expect(data).toEqual({ 'updateProfile': expected })
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

  it('should not delete.', async () => {
    fake.data = { Profile: [ { 'raw': { 'affectedRows': 0 } } ] }
    const expected: any = { 'raw': { 'affectedRows': 0 } }
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
