import * as AWS from "aws-sdk";
import Device from '../models/Device';
import { Context } from '../provider/Context';
import DeviceType from '../models/DeviceType';
import DeviceGroup from '../models/DeviceGroup';

export default class DeviceEngine {
    private context: Context;

    private iotGateway: AWS.Iot;

    constructor(context: Context) {
        this.context = context;

        AWS.config.update({
            region: this.context.region,
        });

        this.iotGateway = new AWS.Iot({ apiVersion: this.context.apiVersion });
    }

    public async registerDevice(name: string, deviceType?: DeviceType, deviceGroup?: DeviceGroup): Promise<Device> {
        const thisObject = this;

        return new Promise<Device>(async function(resolve, reject) {
            const params = {
                thingName: `IoT-PROV-${name}`,
                thingTypeName: deviceType ? deviceType.name : undefined,
            };
            console.log('1');
            
            thisObject.iotGateway.createThing(params, function(err, data) {
                console.log('2');

                if (err) {
                    reject(undefined);
                }

                console.log('3');

                let addedToGroup = false;
                if (deviceGroup) {
                    const addThingToGroupParams = {
                        thingGroupName: deviceGroup.thingGroupName,
                        thingGroupArn: deviceGroup.thingGroupArn,
                        thingName: data.thingName,
                        thingArn: data.thingArn,
                        overrideDynamicGroups: deviceGroup.overrideDynamicGroups,
                    };

                    thisObject.iotGateway.addThingToThingGroup(addThingToGroupParams, function(err, data) {

                        if (err) {
                            reject(undefined);
                        }

                        addedToGroup = true;
                    });
                }
                console.log('4');
                console.log('DATA: ', data);

                resolve(
                    new Device(
                        data.thingId, 
                        data.thingName, 
                        data.thingArn, 
                        deviceType ? deviceType.name : undefined, 
                        addedToGroup ? deviceGroup : undefined),
                );
            });
        });
    }
}
