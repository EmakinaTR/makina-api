import { Controller, Param, QueryParam, Body, Get, Post, Put, Delete } from 'routing-controllers'
import { getRepository } from 'typeorm'
import { Profile } from '../data/entities'

/**
 * REST controller handling Profile requests
 * @class
 */
@Controller('/profile')
export class ProfileController {
  private static instance: ProfileController
  static getInstance () {
    if (!ProfileController.instance) {
      ProfileController.instance = new ProfileController()
    }
    return ProfileController.instance
  }

  repository = getRepository(Profile)

  create (input: any) {
    const profile = new Profile()
    this.repository.merge(profile, input)
    return this.post(profile)
  }

  async update (id: number, input: any) {
    const profile = await this.repository.findOne(id)
    if (!profile) {
      throw new Error(`Couldn’t find profile with id ${id}`)
    }
    this.repository.merge(profile, input)
    return this.post(profile)
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
