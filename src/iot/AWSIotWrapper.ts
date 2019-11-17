import Device from "../models/Device";
import IotWrapper from "./IotWrapper";
import DeviceGroup from "../models/DeviceGroup";

export default class AWSIotWrapper implements IotWrapper {

    createDevice(deviceName: string, deviceTypeName: string): Promise<Device> {
        var promise1 = new Promise<Device>(function (resolve, reject) {
            resolve(new Device());
        });

        return promise1;
    }

    addThingToThingGroup(device: Device, deviceGroup: DeviceGroup): Promise<Device> {
        var promise1 = new Promise<Device>(function (resolve, reject) {
            resolve(new Device());
        });

        return promise1;
    }
}
