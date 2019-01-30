import { merge } from 'lodash'
import { common } from './CommonResolvers'
import { place } from './PlaceResolvers'
import { profile } from './ProfileResolvers'

export const resolvers = merge(common, place, profile)
