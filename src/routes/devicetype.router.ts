// eslint-disable-next-line
import { Request, Response, Application } from 'express';

export default class DeviceTypeGroupRouter {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public setRoutes() {
    this.app.route('/devicetype').post((req: Request, res: Response) => {
      const body = {};
      return res.status(200).send(body);
    });
  }
}
