import { batch } from './GenericLoader'
import DataLoader from 'dataloader'
import { PlaceController, ProfileController } from '../../controllers'

export const context = async () => {
  return {
    loaders: {
      place: new DataLoader(keys => batch(keys, PlaceController.getInstance().repository)),
      profile: new DataLoader(keys => batch(keys, ProfileController.getInstance().repository))
    }
  }
}
