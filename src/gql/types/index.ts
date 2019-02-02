import fs from 'fs'
import path from 'path'

const common = fs.readFileSync(path.join(__dirname, './common.graphql')).toString()
const place = fs.readFileSync(path.join(__dirname, './place.graphql')).toString()
const profile = fs.readFileSync(path.join(__dirname, './profile.graphql')).toString()

export const typeDefs = [
  common,
  place,
  profile
]
