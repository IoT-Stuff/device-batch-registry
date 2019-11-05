import * as AWS from 'aws-sdk';

import { Context } from '../provider/Context';

export default class IoTRegister {

    private context: Context;

    constructor (context: Context) {
        this.context = context;
        AWS.config.update({region: context.region});

    }

    public async registerThing(name: string) {
        let promise = new Promise(async function(resolve, reject) {
    
            var params = {
                thingName: 'name'
            };
            
            const iot = new AWS.Iot({apiVersion: '2015-05-28'});
            await iot.createThing(params, function(err, data) {
                if(err) {
                    console.log(`Error creating thing - ${JSON.stringify(err)}`);
                }
                console.log(`AWS.createThing: ${JSON.stringify(data)}`);
            });
        });

    }
}
  