import { PlaceController, ProfileController } from '../../controllers'

export const profile = {
  Profile: {
    place (_: any) {
      if (_.placeId) {
        return PlaceController.getInstance().getOne(_.placeId)
      } else {
        return _.place
      }
    }
  },
  Query: {
    profile: (_: any, { id }: any) => {
      return ProfileController.getInstance().getOne(id)
    },
    profiles: (_: any, { first, offset }: any) => {
      return ProfileController.getInstance().getAll(first, offset)
    }
  },
  Mutation: {
    createProfile: (_: any, { input }: any) => {
      return ProfileController.getInstance().create(input)
    },
    updateProfile: async (_: any, { id, input }: any) => {
      return ProfileController.getInstance().update(id, input)
    },
    deleteProfile: (_: any, { id }: any) => {
      return ProfileController.getInstance().remove(id)
    }
  }
}
