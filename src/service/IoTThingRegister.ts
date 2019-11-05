import * as AWS from 'aws-sdk';

import Device from '../models/Device';
import { Context } from '../provider/Context';

export default class IoTRegister {

    private context: Context;

    private iotGateway: AWS.Iot;

    constructor (context: Context) {
        this.context = context;
        AWS.config.update({region: this.context.region});
        this.iotGateway = new AWS.Iot({apiVersion: '2015-05-28'});
    }

    public async registerThing(name: string) : Promise<any> {

        const object = this;

        let promise = new Promise<any>(async function(resolve, reject) {
    
            var params = {
                thingName: `IoT-PROV-${name}`
            };
            console.log(`iotGateway : ${JSON.stringify(object.iotGateway)}`);

            const iot = new AWS.Iot({apiVersion: '2015-05-28'});
            iot.createThing(params, function (err, data) {
                if (err) {
                    reject(false);
                }
                resolve(new Device(data.thingName, data.thingArn, data.thingId));
            });
        });
        return promise;
    }
}
  