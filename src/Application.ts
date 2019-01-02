import { createKoaServer } from 'routing-controllers'
import { PlaceController, ProfileController } from './controllers'
import Database from './data/Database'
import { ConfigService } from './services'

/**
 * Singleton class managing application lifecycle.
 * @class
 */
class Application {
  private _server: any

  constructor () {
    this._server = createKoaServer({
      controllers: [
        PlaceController,
        ProfileController
      ]
    })
  }

  /**
   * Starts the application.
   */
  async start (): Promise<void> {
    try {
      await Database.connect()
      const port = ConfigService.get('api.port')
      this._server.listen(port)
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
