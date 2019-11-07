import * as AWS from 'aws-sdk';
import Device from '../models/Device';
import {Context} from '../provider/Context';
import DeviceType from "../models/DeviceType";
import DeviceGroup from "../models/DeviceGroup";

export default class IoTRegister {

    private context: Context;

    private iotGateway: AWS.Iot;

    constructor(context: Context) {
        this.context = context;
        AWS.config.update({region: this.context.region});
        this.iotGateway = new AWS.Iot({apiVersion: this.context.apiVersion});
    }

    public async registerThingGroup(name: string, description: string): Promise<any> {
        const thisObject = this;

        let promise = new Promise<any>(async function (resolve, reject) {

            const params = {
                thingGroupName: `IoT-PROV-${name}`,
                thingGroupProperties: {thingGroupDescription: description},
                tags: [
                    {Key: 'ORG', Value: 'rsouza01'},
                    {Key: 'CREATOR', Value: 'rsouza01@gmail.com'}
                ]
            };

            thisObject.iotGateway.createThingGroup(params, function (err, data) {
                if (err) {
                    reject(false);
                }
                resolve(new DeviceGroup(data.thingGroupId, data.thingGroupName, data.thingGroupArn));
            });
        });
        return promise;
    }

    public async registerThingType(name: string, description: string): Promise<any> {
        const thisObject = this;

        let promise = new Promise<any>(async function (resolve, reject) {

            const params = {
                thingTypeName: `IoT-PROV-${name}`,
                thingTypeProperties: {thingTypeDescription: description},
                tags: [
                    {Key: 'ORG', Value: 'rsouza01'},
                    {Key: 'CREATOR', Value: 'rsouza01@gmail.com'}
                ]
            };

            thisObject.iotGateway.createThingType(params, function (err, data) {
                if (err) {
                    reject(false);
                }
                resolve(new DeviceType(data.thingTypeId, data.thingTypeName));
            });
        });
        return promise;
    }

    public async registerThing(name: string, thingGroup?: any): Promise<any> {

        const thisObject = this;

        let promise = new Promise<any>(async function (resolve, reject) {

            const params = {
                thingName: `IoT-PROV-${name}`
            };

            thisObject.iotGateway.createThing(params, function (err, data) {
                if (err) {
                    reject(false);
                }

                thisObject.iotGateway.addThingToThingGroup(thingGroup)
                resolve(new Device(data.thingName, data.thingArn, data.thingId));
            });
        });
        return promise;
    }

    public async createKeysAndCertificate(device: Device): Promise<any> {

        const thisObject = this;

        let promise = new Promise<any>(async function (resolve, reject) {

            const params = {
                thingName: `IoT-PROV-${name}`
            };
            //console.log(`iotGateway : ${JSON.stringify(thisObject.iotGateway)}`);

            //const iot = new AWS.Iot({apiVersion: '2015-05-28'});
            thisObject.iotGateway.createThing(params, function (err, data) {
                if (err) {
                    reject(false);
                }
                resolve(new Device(data.thingName, data.thingArn, data.thingId));
            });
        });
        return promise;
    }
}
