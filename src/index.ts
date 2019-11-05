import * as express from 'express';
import { v4 as uuid } from 'uuid';
import { Request, Response } from 'express';
import { Context } from './provider/Context';

import IoTThingRegister from '../src/service/IoTThingRegister';

const app = express();

const {
    PORT = 3000,
} = process.env;

app.get('/', async (req: Request, res: Response, next) => {

        const context = new Context('eu-central-1');
        const register = new IoTThingRegister(context);
        
        console.log(context);
        
        await register.registerThing(uuid())
            .then(registered => {
                console.log(`AWS.createThing: ${JSON.stringify(registered)}`);
            })
            .catch(function(err) {
            console.log(`Error creating thing - ${JSON.stringify(err)}`);
        })
        
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
