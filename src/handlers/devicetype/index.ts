import { Application } from 'express';

import * as deviceGet from './devicetype.get'
import * as devicesGet from './devicestype.get'
import * as devicePost from './devicetype.post'

export function registerRoutes(app: Application) {
  
  app.route('/devicetype').get(deviceGet.main);
  app.route('/devicestype').get(devicesGet.main);
  app.route('/devicetype').post(devicePost.main);

}