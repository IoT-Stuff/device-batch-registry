import { Application } from 'express';

import * as deviceGet from './devicegroup.get'
import * as devicesGet from './devicesgroup.get'
import * as devicePost from './devicegroup.post'
import { Context } from '../../provider/Context';
import injectHandlerDependencies from '../../util/injectHandlerDependecies';

export function registerRoutes(app: Application, context: Context) {
  app.route('/devicegroup').get(
    injectHandlerDependencies(deviceGet.main, context));

  app.route('/devicesgroup').get(
    injectHandlerDependencies(devicesGet.main, context));
  
    app.route('/devicegroup').post(
      injectHandlerDependencies(devicePost.main, context));
}