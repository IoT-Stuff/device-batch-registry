import { describe, before, after, it } from 'mocha';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import { Context } from '../../../src/provider/Context';
import Device from '../../../src/models/Device';
import DeviceEngine from '../../../src/engines/DeviceEngine';
import DeviceGroup from '../../../src/models/DeviceGroup';
import DeviceType from '../../../src/models/DeviceType';


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