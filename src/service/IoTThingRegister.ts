import * as AWS from 'aws-sdk';

import { Context } from '../provider/Context';

export default class IoTRegister {

    private context: Context;

    constructor (context: Context) {
        this.context = context;
        AWS.config.update({region: context.region});

    }

    public async registerThing(name: string) : Promise<any>{
        let promise = new Promise<any>(async function(resolve, reject) {
    
            var params = {
                thingName: `IoT-PROV-${name}`
            };
            
            const iot = new AWS.Iot({apiVersion: '2015-05-28'});
            iot.createThing(params, function (err, data) {
                if (err) {
                    reject(false);
                }
                resolve(data);
            });
        });
        return promise;
    }
}
  