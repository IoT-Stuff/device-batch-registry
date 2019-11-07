import app from '../src/index';
import * as supertest from 'supertest';

describe.only('DeviceType', () => {
    let request;
    beforeEach(() => {
        request = supertest(app);
    });
    
    it('should return a successful response for POST /', done => {
        const payload = {
            deviceTypeName: 'device-type-name',
            deviceTypeDescription: 'device-type-description',
        };

        const returnPayload = {
            deviceTypeName: 'device-type-name',
            deviceTypeDescription: 'device-type-description-wrong',
        };
        
        request
            .post('/devicetype')
            .send(payload)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect(200,  returnPayload, done);            
    });
});
