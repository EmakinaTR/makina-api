import { Place } from '../../data/entities/'
import { PlaceController } from '../../controllers'
import { Resolver, Query, Arg, Int, Mutation } from 'type-graphql'
import { DBResponse } from '../types'
import { PlaceInput } from '../inputs' // eslint-disable-line no-unused-vars

@Resolver(Place)
export class PlaceResolver {
  @Query(returns => Place, { nullable: true })
  place (@Arg('id', type => Int) id: number) {
    return PlaceController.getInstance().getOne(id)
  }

  @Query(returns => [Place], { nullable: true })
  places (@Arg('first', type => Int, { nullable: true }) first: number,
          @Arg('offset', type => Int, { nullable: true }) offset: number) {
    return PlaceController.getInstance().getAll(first, offset)
  }

  @Mutation(returns => Place, { nullable: true })
  createPlace (@Arg('input') input: PlaceInput) {
    return PlaceController.getInstance().create(input)
  }

  @Mutation(returns => Place, { nullable: true })
  updatePlace (@Arg('id', type => Int) id: number,
               @Arg('input') input: PlaceInput) {
    return PlaceController.getInstance().update(id, input)
  }

  @Mutation(returns => DBResponse)
  deletePlace (@Arg('id', type => Int) id: number) {
    return PlaceController.getInstance().remove(id)
  }
}
