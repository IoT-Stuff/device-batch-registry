export default class DeviceGroup {
    constructor(
        public thingGroupId: string,
        public thingGroupName: string,
        public thingGroupArn: string,
        public overrideDynamicGroups: boolean = false,
        public thingName?: string,
        public thingArn?: string,
    ) {}
}
