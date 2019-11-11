import { Request, Response } from 'express';
import * as HttpStatus  from 'http-status-codes';
import DeviceEngine from '../../engines/DeviceEngine';
import { Context } from '../../provider/Context';


export function main(req: Request, res: Response, context: Context) {

  const engine = new DeviceEngine(context);

  return res.status(HttpStatus.CREATED).send(req.body);
}
