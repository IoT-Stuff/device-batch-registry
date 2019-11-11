// eslint-disable-next-line
import { Application } from 'express';


import * as deviceGet from './devicegroup.get'
import * as devicesGet from './devicesgroup.get'
import * as devicePost from './devicegroup.post'

export function registerRoutes(app: Application) {
  app.route('/devicegroup').get(deviceGet.main);
  app.route('/devicesgroup').get(devicesGet.main);
  app.route('/devicegroup').post(devicePost.main);
}