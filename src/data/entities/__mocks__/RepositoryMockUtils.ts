import _ from 'lodash'
import * as typeorm from 'typeorm'

/**
 * Creates a middleware function to test functionaltiy of API.
 * Provides a mock implementation to the typeorm.getRepository
 */
export function createRepositoryMock (): void {
  // Temporarily stores created entities.
  const fakeDatabase: any = {
    Place: {
      id: 1,
      entities: []
    },
    Profile: {
      id: 1,
      entities: []
    }
  }

  function getEntities (entityType: any): any[] {
    return fakeDatabase[entityType.name].entities
  }

  function getId (entityType: any): number {
    return fakeDatabase[entityType.name].id++
  }

  function updateEntities (arr: any[], data: any) {
    var index = _.findIndex(arr, _.pick(data, 'id'))
    if (index !== -1) {
      arr.splice(index, 1, data)
    } else {
      arr.push(data)
    }
  }

  function getRepositoryMock (entityType: any): any {
    return {
      merge: (entity: any, input: any): void => {
        // TODO be sure that merge protects entities' field consistency.
        _.merge(entity, input)
      },
      findOne: (id: number): any => {
        let found = getEntities(entityType).filter(x => x.id === id)
        return found.length > 0 ? found[0] : null
      },
      find: (): any => {
        return getEntities(entityType)
      },
      save: (entity: any): any => {
        entity.id = entity.id || getId(entityType)
        updateEntities(getEntities(entityType), entity)
        return entity
      },
      delete: (id: number): any => {
        let removed = _.remove(getEntities(entityType), p => p.id === id)
        return {
          raw: {
            fieldCount: 0,
            affectedRows: removed.length,
            insert: '',
            serverStatus: 0,
            warningStatus: 0
          }
        }
      }
    }
  }

  jest.spyOn(typeorm, 'getRepository').mockImplementation(getRepositoryMock)
}
