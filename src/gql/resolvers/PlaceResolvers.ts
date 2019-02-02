import { PlaceController } from '../../controllers'

export const place = {
  Query: {
    place: (_: any, { id }: any) => {
      return PlaceController.getInstance().getOne(id)
    },
    places: (_: any, { first, offset }: any) => {
      return PlaceController.getInstance().getAll(first, offset)
    }
  },
  Mutation: {
    createPlace: (_: any, { input }: any) => {
      return PlaceController.getInstance().create(input)
    },
    updatePlace: async (_: any, { id, input }: any) => {
      return PlaceController.getInstance().update(id, input)
    },
    deletePlace: (_: any, { id }: any) => {
      return PlaceController.getInstance().remove(id)
    }
  }
}
