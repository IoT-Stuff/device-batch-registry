export class Context {
    public region: string;
    public apiVersion: string;

    constructor(region: string, apiVersion = '2015-05-28') {
        this.apiVersion = apiVersion;
        this.region = region;
    }
}
