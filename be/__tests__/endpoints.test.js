const data = require('../db/data/test-data/index');
const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');

afterAll(() => db.end());

beforeEach(() => seed(data));

describe('Sad path test - route does not exist', () => {
    test('Endpoint "/this_does_not_exist": 404 - Not found', () => {
        return request(app)
            .get('/this_does_not_exist')
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe('Not found')
            });
    });
});

describe('Happy path test - emailJS public key endpoint', () => {
    test('Endpoint "/api/emailJS/public_key": "key": <fv5tbtv25tv43t3t3t3t4vu76i>', () => {
        return request(app)
            .get('/api/email_js/public_key')
            .expect(200)
            .then(({ body:  { key }  }) => {
                expect(key[0].key).toBe('fv5tbtv25tv43t3t3t3t4vu76i');
            });
    });
});

describe('Happy path test - reCAPTCHA public key endpoint', () => {
    test('Endpoint "/api/reCAPTCHA/public_key": "key": <>', () => {
        return request(app)
            .get('/api/reCAPTCHA/public_key')
            .expect(200)
            .then(({ body: { key } }) => {
                expect(key[0].key).toBe('dvmk339595959595923tr45b3b');
            });
    });
});