import Device from "../models/Device";
import IotWrapper from "./IotWrapper";
import DeviceGroup from "../models/DeviceGroup";
import uuid = require("uuid");

export default class AWSIotWrapper implements IotWrapper {

    async createDevice(deviceName: string, deviceTypeName: string): Promise<Device> {

        var promise1 = new Promise<Device>(function (resolve, reject) {

            if(deviceName === 'IoT-PROV-INVALID-DEVICE-NAME') {
                reject({});
                return;

            }
            resolve(new Device(uuid.v4(), deviceName, 'arn', deviceTypeName));
            return;
        });

        return promise1;
    }

    async addThingToThingGroup(device: Device, deviceGroup: DeviceGroup): Promise<Device> {
        var promise1 = new Promise<Device>(function (resolve, reject) {


            if(deviceGroup.thingGroupName === 'VALID-DEVICE-NAME-INVALID-GROUP-NAME') {
                reject({});
                return;
            }
            
            resolve(new Device(device.id, device.name, device.arn, device.deviceTypeName, deviceGroup));
            return;
        });

        return promise1;
    }
}
