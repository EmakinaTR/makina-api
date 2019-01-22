export const typeDefs = `
  type DBResponseRaw {
    fieldCount: Int
    affectedRows: Int
    insert: String
    serverStatus: Int
    warningStatus: Int
  }
  type DBResponse {
    raw: DBResponseRaw
  }
`
export const resolvers = {
}
