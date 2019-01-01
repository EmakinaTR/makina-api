import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers'
import { getRepository } from 'typeorm'
import { Place } from '../data/entities'

@Controller('/place')
export class PlaceController {
  repository = getRepository(Place)

  @Get()
  getAll () {
    return this.repository.find()
  }

  @Get('/:id')
  getOne (@Param('id') id: number) {
    return this.repository.findOne(id)
  }

  @Post()
  async post (@Body() entity: Place) {
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
