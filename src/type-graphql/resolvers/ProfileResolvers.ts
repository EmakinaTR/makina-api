import { Profile } from '../../data/entities/'
import { ProfileController, PlaceController } from '../../controllers'
import { Resolver, Query, Arg, Int, Mutation, FieldResolver, Root } from 'type-graphql'
import { DBResponse } from '../types'
import { ProfileInput } from '../inputs' // eslint-disable-line no-unused-vars

@Resolver(of => Profile)
export class ProfileResolver {
  @FieldResolver()
  place (@Root() profile: Profile) {
    if (profile.placeId) {
      return PlaceController.getInstance().getOne(profile.placeId)
    } else {
      return profile.place
    }
  }

  @Query(returns => Profile, { nullable: true })
  profile (@Arg('id', type => Int) id: number) {
    return ProfileController.getInstance().getOne(id)
  }

  @Query(returns => [Profile], { nullable: true })
  profiles (@Arg('first', type => Int, { nullable: true }) first: number,
          @Arg('offset', type => Int, { nullable: true }) offset: number) {
    return ProfileController.getInstance().getAll(first, offset)
  }

  @Mutation(returns => Profile, { nullable: true })
  createProfile (@Arg('input') input: ProfileInput) {
    return ProfileController.getInstance().create(input)
  }

  @Mutation(returns => Profile, { nullable: true })
  updateProfile (@Arg('id', type => Int) id: number,
               @Arg('input') input: ProfileInput) {
    return ProfileController.getInstance().update(id, input)
  }

  @Mutation(returns => DBResponse)
  deleteProfile (@Arg('id', type => Int) id: number) {
    return ProfileController.getInstance().remove(id)
  }
}
