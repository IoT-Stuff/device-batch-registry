import { describe, before, after, it } from 'mocha';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { Context } from '../../../src/provider/Context';


chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Context', function () {

    it('should instantiate a Context object, with region', async () => {
        const context = new Context("eu-central-1");
        expect(context).not.to.be.undefined;
    });

    it('should instantiate a Context object, with region and api version', async () => {
        const context = new Context("eu-central-1", '2015-05-28');
        expect(context).not.to.be.undefined;
    });

});