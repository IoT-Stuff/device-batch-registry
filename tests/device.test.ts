import app from '../src/index';
import * as supertest from 'supertest';
import * as HttpStatus  from 'http-status-codes';

describe('Device endpoints', () => {
    let request;
    beforeEach(() => {
        request = supertest(app);
    });
    
    it('should return a successful response for POST /', done => {
        request.post('/device')
            .expect(HttpStatus.NOT_IMPLEMENTED, done);
    });

    it('should return a successful response for GET /', done => {
        request.get('/device')
            .expect(HttpStatus.NOT_IMPLEMENTED, done);
    });

    it('should return a successful response for LIST-GET /', done => {
        request.get('/devices')
            .expect(HttpStatus.NOT_IMPLEMENTED, done);
    });

});
