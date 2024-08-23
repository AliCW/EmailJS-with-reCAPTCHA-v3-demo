const index = require('../db/data/test-data/index');

describe('Basic testing for dummy data - private keys', () => {
    test('Should return an array with a length of 4', () => {
        expect(index.privateKeys).toHaveLength(4);
        expect(index.privateKeys).toBeInstanceOf(Array);
    });
    test('Each object should have two keys [key, purpose], expect two strings', () => {
        const i = Math.floor(Math.random() * 4);
        expect(index.privateKeys[i]).toEqual(
            expect.objectContaining({
                key: expect.any(String),
                purpose: expect.any(String),
                type: expect.any(String),
            })
        );
    });
});

describe('Basic testing for dummy data - public keys', () => {
    test('Should return an array with a length of 2', () => {
        expect(index.publicKeys).toHaveLength(2);
        expect(index.publicKeys).toBeInstanceOf(Array);
    });
    test('Each object should have two keys [key, purpose], expect two strings', () => {
        const i = Math.floor(Math.random() * 2);
        expect(index.publicKeys[i]).toEqual(
            expect.objectContaining({
                key: expect.any(String),
                type: expect.any(String),
            })
        );
    });
});