import * as HttpStatus from 'http-status-codes';
import * as supertest from 'supertest';

import app from '../src/index';

describe('DeviceType', () => {
    let request;
    beforeEach(() => {
        request = supertest(app);
    });
    
    test('should return a successful response for POST /', done => {
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

    test('should return a successful response for GET /', done => {
        request.get('/devicetype')
            .expect(HttpStatus.NOT_IMPLEMENTED, done);
    });

    test('should return a successful response for LIST-GET /', done => {
        request.get('/devicestype')
            .expect(HttpStatus.NOT_IMPLEMENTED, done);
    });

});
