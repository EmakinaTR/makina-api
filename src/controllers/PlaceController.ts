import { Controller, Param, QueryParam, Body, Get, Post, Put, Delete } from 'routing-controllers'
import { getRepository } from 'typeorm'
import { Place } from '../data/entities'
import _ from 'lodash'

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

  async create (input: any) {
    input = _.merge({}, input)
    const profile = this.repository.merge(new Place(), input)
    return this.post(profile)
  }

  async update (id: number, input: any) {
    input = _.merge({}, input)
    await this.repository.update(id, input)
    return this.getOne(id)
  }

  @Get()
  getAll (@QueryParam('limit') limit: number | undefined,
          @QueryParam('offset') offset: number | undefined) {
    return this.repository.find({ take: limit, skip: offset })
  }

  @Get('/:id')
  getOne (@Param('id') id: number) {
    return this.repository.findOne({ where: { 'id': id } })
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
