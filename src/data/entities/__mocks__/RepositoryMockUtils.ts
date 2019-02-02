import * as typeorm from 'typeorm'

/**
 * Creates a middleware function to test functionaltiy of API.
 * Provides a mock implementation to the typeorm.getRepository
 */
export function createRepositoryMock (fake: any): void {
  function getFakeData (entityType: any): any[] {
    return fake.data[entityType.name]
  }
  function getRepositoryMock (entityType: any): any {
    return {
      merge: (): void => {
      },
      findOne: (arg: any): any => {
        let found = getFakeData(entityType).filter(x => x.id === arg.where.id)
        return found[0]
      },
      find: (): any => {
        return getFakeData(entityType)
      },
      save: (): any => {
        return getFakeData(entityType)[0]
      },
      update: (): any => {
      },
      delete: (): any => {
        return getFakeData(entityType)[0]
      }
    }
  }

  jest.spyOn(typeorm, 'getRepository').mockImplementation(getRepositoryMock)
}
