import app from '../src/index';
import * as supertest from 'supertest';
import * as HttpStatus  from 'http-status-codes';

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
            deviceTypeDescription: 'device-type-description',
        };
        
        request
            .post('/devicetype')
            .send(payload)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect(HttpStatus.CREATED,  returnPayload, done);            
    });

    it('should return a successful response for GET /', done => {
        request.get('/devicetype')
            .expect(HttpStatus.NOT_IMPLEMENTED, done);
    });

    it('should return a successful response for LIST-GET /', done => {
        request.get('/devicestype')
            .expect(HttpStatus.NOT_IMPLEMENTED, done);
    });

});
