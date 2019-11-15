import { describe, before, after, it } from 'mocha';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { Context } from '../../../src/provider/Context';
import Device from '../../../src/models/Device';
import DeviceEngine from '../../../src/engines/DeviceEngine';
import DeviceGroup from '../../../src/models/DeviceGroup';
import DeviceType from '../../../src/models/DeviceType';


chai.use(chaiAsPromised);
const expect = chai.expect;

var AWS = require('aws-sdk-mock');

describe.only('DeviceEngine', function () {

    const context = new Context("eu-central-1");

    before(function () {

        console.log('>>>>>>>>>>>> BEFORE ');

        const device = {
            thingName: 'ThingName',
            thingArn: 'ThingArn',
            thingId: 'ThingId',
            deviceTypeName: 'deviceTypeName'
        }

        AWS.mock('Iot', 'createThing', function (params, callback) {
            console.log('>>>>>>>>>>>> params => ', params);

            if (params.thingName === 'IoT-PROV-INVALID-DEVICE-NAME')
                callback({}, 'Invalid device name');

            callback(null, device);
        });

        AWS.mock('Iot', 'addThingToThingGroup', function (params, callback) {
            console.log('params => ', params);
            if (params.thingGroupName === 'VALID-DEVICE-NAME-INVALID-GROUP-NAME')
                callback({}, 'Invalid group name');

            callback(null, {});
        });


    });

    after(() => {
        AWS.restore();
    });

    it('should instantiate a DeviceEngine object', async () => {
        const deviceEngine = new DeviceEngine(context);
        expect(deviceEngine).not.to.be.undefined;
    });

    it('should create a device', async () => {
        const deviceEngine = new DeviceEngine(context);
        const device: Device = await deviceEngine.registerDevice('ThingName');

        expect(device).not.to.be.undefined;
        expect(device.name).to.be.equal('IoT-PROV-ThingName');
    });

    it.only('should create a device with a device type', async () => {

        const deviceType: DeviceType = {
            id: 'deviceTypeId',
            name: 'deviceTypeName',
        };

        const deviceEngine = new DeviceEngine(context);
        const device: Device = await deviceEngine.registerDevice('ThingName', deviceType);

        expect(device).not.to.be.undefined;
        expect(device.deviceTypeName).not.to.be.undefined;
        expect(device.deviceTypeName).to.be.equal('deviceTypeName');
    });

    it('should create a device with a device group', async () => {

        const deviceGroup: DeviceGroup = {
            thingGroupId: 'thingGroupId',
            thingGroupName: 'thingGroupName',
            thingGroupArn: 'thingGroupName',
            overrideDynamicGroups: false
        };

        const deviceEngine = new DeviceEngine(context);
        const device: Device = await deviceEngine.registerDevice('ThingName', undefined, deviceGroup);

        expect(device).not.to.be.undefined;
        expect(device.deviceGroup).not.to.be.undefined;
        expect(device.deviceGroup.thingGroupId).to.be.equal('thingGroupId');
    });

    it('should create a device with a device type and device group', async () => {

        const deviceType: DeviceType = {
            id: 'deviceTypeId',
            name: 'deviceTypeName',
        };

        const deviceGroup: DeviceGroup = {
            thingGroupId: 'thingGroupId',
            thingGroupName: 'thingGroupName',
            thingGroupArn: 'thingGroupName',
            overrideDynamicGroups: false
        };

        const deviceEngine = new DeviceEngine(context);
        const device: Device = await deviceEngine.registerDevice('ThingName', deviceType, deviceGroup);

        expect(device).not.to.be.undefined;
        expect(device.deviceGroup).not.to.be.undefined;
        expect(device.deviceTypeName).not.to.be.undefined;
        expect(device.deviceGroup.thingGroupId).to.be.equal('thingGroupId');
        expect(device.deviceTypeName).to.be.equal('deviceTypeName');
    });

    it('should fail creating a device with invalid name', async () => {
        const deviceEngine = new DeviceEngine(context);

        deviceEngine.registerDevice('INVALID-DEVICE-NAME')
            .then(() => {
                expect(true).to.be.undefined;
            })
            .catch((err) => {
                expect(err).to.be.undefined;
            })
    });

    it('should fail adding  a device to an invalid group', async () => {
        const deviceGroup: DeviceGroup = {
            thingGroupId: 'thingGroupId',
            thingGroupName: 'VALID-DEVICE-NAME-INVALID-GROUP-NAME',
            thingGroupArn: 'thingGroupName',
            overrideDynamicGroups: false
        };

        const deviceEngine = new DeviceEngine(context);

        deviceEngine.registerDevice('ThingName', undefined, deviceGroup)
            .then(() => {
                expect(true).to.be.false;
            })
            .catch((err) => {
                expect(err).to.be.undefined;
            })
    });

});