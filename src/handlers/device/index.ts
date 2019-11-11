import { Application } from 'express';

import * as deviceGet from './device.get'
import * as devicesGet from './devices.get'
import * as devicePost from './device.post'

export function registerRoutes(app: Application) {
  
  app.route('/device').get(deviceGet.main);
  app.route('/devices').get(devicesGet.main);
  app.route('/device').post(devicePost.main);

}