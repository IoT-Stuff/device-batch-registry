import * as AWS from 'aws-sdk';
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

    public async registerDevice(name: string, deviceType?: DeviceType, deviceGroup?: DeviceGroup): Promise<any> {
        const thisObject = this;

        const promise = new Promise<any>(async function(resolve, reject) {
            const params = {
                thingName: `IoT-PROV-${name}`,
                thingTypeName: deviceType ? deviceType.name : undefined,
            };

            thisObject.iotGateway.createThing(params, function(err, data) {
                if (err) {
                    reject(false);
                }
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
                            reject(false);
                        }

                        addedToGroup = true;
                        resolve(true);
                    });
                }

                resolve(
                    new Device(data.thingName, data.thingArn, data.thingId, addedToGroup ? deviceGroup : undefined),
                );
            });
        });
        return promise;
    }
}
