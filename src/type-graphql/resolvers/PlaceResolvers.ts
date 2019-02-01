import { Place } from '../../data/entities/'
import { PlaceController } from '../../controllers'
import { Resolver, Query, Arg } from 'type-graphql'

@Resolver(Place)
export class PlaceResolver {
  @Query(returns => Place)
  place (@Arg('id') id: number) {
    return PlaceController.getInstance().getOne(id)
  }

  @Query(returns => [Place])
  places (@Arg('first', { nullable: true }) first: number,
          @Arg('offset', { nullable: true }) offset: number) {
    return PlaceController.getInstance().getAll(first, offset)
  }
}
