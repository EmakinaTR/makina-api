import { Place } from '../../data/entities/'
import { PlaceController } from '../../controllers'
import { ListArgs } from './types/ListArgs'
import { Resolver, Query, Arg, Args } from 'type-graphql'

@Resolver(Place)
export class PlaceResolver {

  @Query(returns => Place)
  place (@Arg('id') id: number) {
    return PlaceController.getInstance().getOne(id)
  }

  @Query(returns => [Place])
  places (@Args() { first, offset }: ListArgs) {
    return PlaceController.getInstance().getAll(first, offset)
  }
}
