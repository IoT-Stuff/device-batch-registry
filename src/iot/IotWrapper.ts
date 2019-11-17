import Device from "../models/Device";
import DeviceGroup from "../models/DeviceGroup";

export default interface IotWrapper {

    createDevice(deviceName: string,  deviceTypeName: string): Promise<Device>;

    addThingToThingGroup(device: Device, deviceGroup: DeviceGroup): Promise<Device>;
    
}
