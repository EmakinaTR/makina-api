import 'reflect-metadata'
import { getFromContainer, MetadataStorage } from 'class-validator' // tslint:disable-line
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import {getMetadataArgsStorage} from 'routing-controllers'
import { routingControllersToSpec } from 'routing-controllers-openapi'

import { PlaceController } from '../controllers/PlaceController';

class OpenApiService {
    public ApiSpec: any = {}

    constructor(){
    const routingControllersOptions = {
        controllers: [PlaceController]
      }
      
      const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas
      const schemas = validationMetadatasToSchemas(metadatas, {
        refPointerPrefix: '#/components/schemas/' // TODO: Can be replaced with /entities to match naming with realted folder.
      })
      
      const storage = getMetadataArgsStorage()
      this.ApiSpec = routingControllersToSpec(storage, routingControllersOptions, {
        components: { schemas },
        info: {
          description: 'makina-api OpenApi Documentation',
          title: 'makina-api',
          version: '1.0'
        }
      })
}
    
}

export default new OpenApiService()