import { Controller, Param, QueryParam, Body, Get, Post, Put, Delete } from 'routing-controllers'
import { getRepository } from 'typeorm'
import { Profile } from '../data/entities'
import _ from 'lodash'

/**
 * REST controller handling Profile requests
 * @class
 */
@Controller('/profile')
export class ProfileController {
  private static instance: ProfileController
  public static getInstance (): ProfileController {
    if (!ProfileController.instance) {
      ProfileController.instance = new ProfileController()
    }
    return ProfileController.instance
  }

  private repository = getRepository(Profile)

  public async create (input: any) {
    input = _.merge({}, input)
    const profile = this.repository.merge(new Profile(), input)
    return this.post(profile)
  }

  public async update (id: number, input: any) {
    input = _.merge({}, input)
    await this.repository.update(id, input)
    return this.getOne(id)
  }

  @Get()
  public getAll (
    @QueryParam('limit') limit: number | undefined,
    @QueryParam('offset') offset: number | undefined
  ) {
    return this.repository.find({ take: limit, skip: offset })
  }

  @Get('/:id')
  public getOne (@Param('id') id: number) {
    return this.repository.findOne({ where: { 'id': id } })
  }

  @Post()
  public async post (@Body() profile: Profile) {
    return this.repository.save(profile)
  }

  @Put('/:id')
  public put (@Param('id') id: number, @Body() profile: Profile) {
    return this.repository.save(profile)
  }

  @Delete('/:id')
  public remove (@Param('id') id: number) {
    return this.repository.delete(id)
  }
}
