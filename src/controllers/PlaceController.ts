import { Controller, Param, QueryParam, Body, Get, Post, Put, Delete } from 'routing-controllers'
import { getRepository } from 'typeorm'
import { Place } from '../data/entities'

/**
 * REST controller handling Place requests
 * @class
 */
@Controller('/place')
export class PlaceController {
  private static instance: PlaceController
  static getInstance () {
    if (!PlaceController.instance) {
      PlaceController.instance = new PlaceController()
    }
    return PlaceController.instance
  }

  repository = getRepository(Place)

  create (input: any) {
    const place = new Place()
    this.repository.merge(place, input)
    return this.post(place)
  }

  async update (id: number, input: any) {
    const place = await this.repository.findOne(id)
    if (!place) {
      throw new Error(`Couldn’t find place with id ${id}`)
    }
    this.repository.merge(place, input)
    return this.post(place)
  }

  @Get()
  getAll (@QueryParam('limit') limit: number,
          @QueryParam('offset') offset: number) {
    return this.repository.find({ take: limit, skip: offset })
  }

  @Get('/:id')
  getOne (@Param('id') id: number) {
    return this.repository.findOne(id)
  }

  @Post()
  post (@Body() entity: Place) {
    return this.repository.save(entity)
  }

  @Put('/:id')
  put (@Param('id') id: number, @Body() entity: any) {
    return this.repository.save(entity)
  }

  @Delete('/:id')
  remove (@Param('id') id: number) {
    return this.repository.delete(id)
  }
}
