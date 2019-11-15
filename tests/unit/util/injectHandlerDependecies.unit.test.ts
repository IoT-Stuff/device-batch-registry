import { describe, before, after, it } from 'mocha';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import { Context } from '../../../src/provider/Context';
import injectHandlerDependencies from '../../../src/util/injectHandlerDependecies';

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('injectHandlerDependecies', function () {
    const handler = (req: Request, res: Response, context: Context) => { return { succes: true }};

    it('should inject a Context into the handler', async () => {
        const context = new Context("eu-central-1");
        const req = {} as Request;
        const res = {} as Response;

        const decoratedHandler = injectHandlerDependencies(handler, context);

        expect(await decoratedHandler(req, res)).to.be.deep.equal({ succes: true });
    });
});