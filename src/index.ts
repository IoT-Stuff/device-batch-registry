import * as express from 'express';
import uuidv4 from 'uuid/v4';
import { Request, Response } from 'express';
import { Context } from './provider/Context';

import IoTThingRegister from '../src/service/IoTThingRegister';

const app = express();
const {
    PORT = 3000,
} = process.env;

app.get('/', (req: Request, res: Response) => {

    const context = new Context('eu-central-1');
    const register = new IoTThingRegister(context);
    console.log(context);
    console.log(register.registerThing(uuidv4));
    

    res.send({
        message: JSON.stringify(context),
    });
});

if (require.main === module) { // true if file is executed
    app.listen(PORT, () => {
        console.log('server started at http://localhost:'+PORT);
    });
}

export default app;
