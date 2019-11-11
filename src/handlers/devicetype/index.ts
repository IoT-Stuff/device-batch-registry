import { Application } from 'express';

import * as deviceGet from './devicetype.get'
import * as devicesGet from './devicestype.get'
import * as devicePost from './devicetype.post'
import { Context } from '../../provider/Context';
import injectHandlerDependencies from '../../util/injectHandlerDependecies';

export function registerRoutes(app: Application, context: Context) {
  
  app.route('/devicetype').get(
    injectHandlerDependencies(deviceGet.main, context));

  app.route('/devicestype').get(
    injectHandlerDependencies(devicesGet.main, context));
  
    app.route('/devicetype').post(
      injectHandlerDependencies(devicePost.main, context));

}