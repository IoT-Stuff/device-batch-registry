import * as AWS from "aws-sdk";
import Device from '../models/Device';
import IotWrapper from '../iot/IotWrapper';
import { Context } from '../provider/Context';
import DeviceType from '../models/DeviceType';
import DeviceGroup from '../models/DeviceGroup';
import AWSIotWrapper from "../iot/AWSIotWrapper";

export default class DeviceEngine {
    private context: Context;

    //private iotGateway: AWS.Iot;
    private iotGateway: IotWrapper;
    
    constructor(context: Context) {
        this.context = context;

        AWS.config.update({
            region: this.context.region,
        });

        //this.iotGateway = new AWS.Iot({ apiVersion: this.context.apiVersion });
        this.iotGateway = new AWSIotWrapper();

    }

    public async registerDevice(name: string, deviceType?: DeviceType, deviceGroup?: DeviceGroup): Promise<Device> {
        const thisObject = this;

        return new Promise<Device>(async function(resolve, reject) {
            const params = {
                thingName: `IoT-PROV-${name}`,
                thingTypeName: deviceType ? deviceType.name : undefined,
            };

            thisObject.iotGateway.createDevice(`IoT-PROV-${name}`,  deviceType ? deviceType.name : undefined)
            .then(device => {
                if (deviceGroup) {
                    thisObject.iotGateway.addThingToThingGroup(device, deviceGroup)
                    .then(deviceWithGroup => {

                    })
                    .catch(err => {
                        reject(undefined);
                        return;
                    });
                }
                resolve(device);
                return;
            })
            .catch(err => {
                reject(undefined);
                return;
            });
        });
    }
}
