import { Application } from 'express';

import * as deviceGet from './device.get'
import * as devicesGet from './devices.get'
import * as devicePost from './device.post'
import { Context } from '../../provider/Context';
import injectHandlerDependencies from '../../util/injectHandlerDependecies';

export function registerRoutes(app: Application, context: Context) {
  
  app.route('/device').get(
    injectHandlerDependencies(deviceGet.main, context));

  app.route('/devices').get(
    injectHandlerDependencies(devicesGet.main, context));
  
    app.route('/device').post(
      injectHandlerDependencies(devicePost.main, context));
}