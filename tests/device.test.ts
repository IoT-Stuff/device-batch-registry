import * as supertest from 'supertest';
import * as HttpStatus from 'http-status-codes';

import app from '../src/index';

describe('Device endpoints', () => {
    
    let request;
    beforeEach(() => {
        request = supertest(app);
    });

    test('should return a successful response for POST /', async done => {

        const payload = {
            name: 'device_name_1'
        };

        const returnPayload = {
            id: `IoT-PROV-${payload.name}`
        };

        const response = await request
            .post('/device')
            .send(payload)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');

        expect(response.status).toBe(HttpStatus.CREATED);
        expect(response.body.id).toBe(returnPayload.id);

        done();
    });

    test('should return a successful response for GET /', done => {
        request.get('/device')
            .expect(HttpStatus.NOT_IMPLEMENTED, done);
    });

    test('should return a successful response for LIST-GET /', done => {
        request.get('/devices')
            .expect(HttpStatus.NOT_IMPLEMENTED, done);
    });

});

