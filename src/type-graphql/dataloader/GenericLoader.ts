import { In, Repository } from 'typeorm' // eslint-disable-line no-unused-vars

export const batch = async (keys: {}[], repository: Repository<any>) => {
  const results = await repository.find({
    where: {
      id: keys.length > 1 ? In(keys) : keys[0]
    }
  })

  return keys.map(key => results.find(result => Number(result.id) === key))
}
