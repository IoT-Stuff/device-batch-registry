import DeviceGroup from './DeviceGroup';

export default class Device {
    constructor(public id: string, public name: string, public arn: string, public deviceTypeName?: string, public deviceGroup?: DeviceGroup) {}
}
