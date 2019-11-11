import * as express from "express";
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import { v4 as uuid } from "uuid";
import { Request, Response } from "express";
import { Context } from "./provider/Context";


import IoTThingRegister from "./service/IoTRegister";

import * as handlers from './handlers'

const app = express();

const { PORT = 3000 } = process.env;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

const context = new Context("eu-central-1");
  
handlers.registerRoutes(app, context);

app.get("/", async (req: Request, res: Response, next) => {
    res.send({
        message: 'RESULT'
      });
});

app.get("/boilerplate", async (req: Request, res: Response, next) => {
  const context = new Context("eu-central-1");
  const register = new IoTThingRegister(context);

  /** DEVICE GROUP */
  const deviceGroup = await register
    .registerDeviceGroup(`DeviceGroup-${uuid()}`, "DeviceGroup1 description")
    .then(registered => registered)
    .catch(function(err) {
      console.log(`Error creating Device Group - ${JSON.stringify(err)}`);
    });
  console.log(`Group : ${JSON.stringify(deviceGroup, null, 2)}`);

  /** DEVICE TYPE */
  const deviceType = await register
    .registerDeviceType(`DeviceType-${uuid()}`, "DeviceType1 description")
    .then(registered => registered)
    .catch(function(err) {
      console.log(`Error creating Device type - ${JSON.stringify(err)}`);
    });
  console.log(`Device Type : ${JSON.stringify(deviceType, null, 2)}`);

  /** DEVICE */
  await register
    .registerDevice(uuid(), deviceType, deviceGroup)
    .then(registered => registered)
    .catch(function(err) {
      console.log(`Error creating device - ${JSON.stringify(err)}`);
    });

  res.send({
    message: JSON.stringify(context)
  });
});

if (require.main === module) {
  // true if file is executed
  app.listen(PORT, () => {
    console.log("server started at http://localhost:" + PORT);
  });
}

export default app;
