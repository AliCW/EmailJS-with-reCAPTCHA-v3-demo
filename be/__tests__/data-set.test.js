const index = require('../db/data/test-data/index');

describe('Basic testing for dummy data', () => {
    test('Should return an array with a length of 2', () => {
        expect(index.emailJS).toHaveLength(4);
        expect(index.emailJS).toBeInstanceOf(Array);
    });
    test('Each object should have two keys [key, purpose], expect two strings', () => {
        const i = Math.floor(Math.random() * 4);
        expect(index.emailJS[i]).toEqual(
            expect.objectContaining({
                key: expect.any(String),
                purpose: expect.any(String),
            })
        );
    });
});