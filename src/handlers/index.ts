import { Application } from 'express';

import * as device from './device';
import * as devicegroup from './devicegroup';
import * as devicetype from './devicetype';
import { Context } from '../provider/Context';

export function registerRoutes(app: Application, context: Context) {
  device.registerRoutes(app, context);
  devicegroup.registerRoutes(app, context);
  devicetype.registerRoutes(app, context);
}
