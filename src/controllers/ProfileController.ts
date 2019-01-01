import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers'
import { getRepository } from 'typeorm'
import { Profile } from '../data/entities'

@Controller('/profile')
export class ProfileController {
  repository = getRepository(Profile)

  @Get()
  getAll () {
    return this.repository.find()
  }

  @Get('/:id')
  getOne (@Param('id') id: number) {
    return this.repository.findOne(id)
  }

  @Post()
  async post (@Body() profile: Profile) {
    return this.repository.save(profile)
  }

  @Put('/:id')
  put (@Param('id') id: number, @Body() profile: Profile) {
    return this.repository.save(profile)
  }

  @Delete('/:id')
  remove (@Param('id') id: number) {
    return this.repository.delete(id)
  }
}
