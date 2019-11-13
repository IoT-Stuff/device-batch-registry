export class Context {
    public region: string;
    public apiVersion: string;

    constructor(region: string, apiVersion: string = '2015-05-28') {
        this.apiVersion = apiVersion;
        this.region = region;
    }
}
