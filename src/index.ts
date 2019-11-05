import * as express from 'express';
import { Request, Response } from 'express';
import { Context } from './provider/Context';

const app = express();
const {
    PORT = 3000,
} = process.env;

app.get('/', (req: Request, res: Response) => {

    const context = new Context('region-1');

    console.log(context);

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
