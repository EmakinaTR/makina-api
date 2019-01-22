import { createKoaServer } from 'routing-controllers'
import { PlaceController, ProfileController } from './controllers'
import Database from './data/Database'
import * as dotenv from 'dotenv'

/**
 * Singleton class managing application lifecycle.
 * @class
 */
class Application {
  private _server: any

  /**
   * Starts the application.
   */
  async start (): Promise<void> {
    try {
      dotenv.config()
      await Database.connect()
      const port = process.env.API_PORT
      this._server = createKoaServer({
        controllers: [
          PlaceController,
          ProfileController
        ]
      }).listen(port)
    } catch (e) {
      console.error('Failed to start the application', e)
    }
  }

  /**
   * Stops the application.
   */
  async stop (): Promise<void> {
    try {
      await Database.disconnect()
      this._server.close()
    } catch (e) {
      console.error('Failed to stop the application', e)
    }
  }

  /**
   * Returns http server.
   */
  getServer () {
    return this._server
  }
}

export default new Application()
