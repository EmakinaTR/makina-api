import { Profile } from '../../data/entities'
import { ProfileController } from '../../controllers'
import { Resolver, Query, Arg, Int, Mutation, FieldResolver, Root, Ctx } from 'type-graphql'
import { DBResponse } from '../types'
import { ProfileInput } from '../inputs' // eslint-disable-line no-unused-vars

@Resolver(of => Profile)
export class ProfileResolver {
  @FieldResolver()
  public place (@Root() profile: Profile,
         @Ctx() ctx: any) {
    return profile.place || (profile.placeId ? ctx.loaders.place.load(profile.placeId) : null)
  }

  @Query(returns => Profile, { nullable: true })
  public profile (@Arg('id', type => Int) id: number,
           @Ctx() ctx: any) {
    return ctx.loaders.profile.load(id)
  }

  @Query(returns => [Profile], { nullable: true })
  public profiles (@Arg('first', type => Int, { nullable: true }) first: number,
            @Arg('offset', type => Int, { nullable: true }) offset: number) {
    return ProfileController.getInstance().getAll(first, offset)
  }

  @Mutation(returns => Profile, { nullable: true })
  public createProfile (@Arg('input') input: ProfileInput) {
    return ProfileController.getInstance().create(input)
  }

  @Mutation(returns => Profile, { nullable: true })
  public updateProfile (@Arg('id', type => Int) id: number,
               @Arg('input') input: ProfileInput) {
    return ProfileController.getInstance().update(id, input)
  }

  @Mutation(returns => DBResponse)
  public deleteProfile (@Arg('id', type => Int) id: number) {
    return ProfileController.getInstance().remove(id)
  }
}
