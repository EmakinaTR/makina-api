import EnvToJSON from '../services/EnvToJSON'
import * as path from 'path'

const fs = require('fs')
const fsPromises = fs.promises

const envPath: string = path.join(__dirname, '../../.env')
const envBakPath: string = path.join(__dirname, '../../.env.bak')

async function renameExistingEnvFile () {
  try {
    // Check existing file
    await fsPromises.access(envPath, fs.constants.F_OK)
    // Exists, move to temp file
    await fsPromises.rename(envPath, envBakPath)
  } catch (e) {
    // Not exist
  }
}

async function rollbackChanges () {
  try {
    await fsPromises.access(envBakPath, fs.constants.F_OK)
    // Exists, move
    await fsPromises.rename(envBakPath, envPath)
  } catch (e) {
    // Not exist
  }
}

async function createTestFile (fileData: string) {
  await fsPromises.writeFile(envPath, fileData)
}

async function getResponse (fileData: string): Promise<object> {
  await renameExistingEnvFile()
  await createTestFile(fileData)
  let response: object = EnvToJSON()
  await rollbackChanges()
  return response
}

const testCases = [
  {
    fileData: 'DATABASE_HOST=192.168.1.1\nDATABASE_PORT=33060\nAPI_PORT=443\n',
    expectedData: {
      'api': {
        'port': 443
      },
      'database': {
        'host': '192.168.1.1',
        'port': 33060
      }
    }
  },
  {
    fileData: '',
    expectedData: {}
  }
]

test('should read and return expected json', async () => {
  for (let i = 0, ii = testCases.length; i !== ii; i++) {
    let response: object = await getResponse(testCases[i].fileData)
    expect(response).toEqual(testCases[i].expectedData)
  }
})
