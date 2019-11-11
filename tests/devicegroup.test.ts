import app from '../src/index';
import * as supertest from 'supertest';

import * as HttpStatus  from 'http-status-codes';

describe('DeviceTGroup Endpoints', () => {
    let request;

    beforeEach(() => {
        request = supertest(app);
    });

    it('should return a successful response for POST /', done => {
        request.post('/devicegroup')
            .expect(HttpStatus.NOT_IMPLEMENTED, done);
    });

    it('should return a successful response for GET /', done => {
        request.get('/devicegroup')
            .expect(HttpStatus.NOT_IMPLEMENTED, done);
    });

    it('should return a successful response for LIST-GET /', done => {
        request.get('/devicesgroup')
            .expect(HttpStatus.NOT_IMPLEMENTED, done);
    });
});
