const index = require('../db/data/test-data/index');

describe('Basic testing for dummy data', () => {
    test('Should return an array with a length of 2', () => {
        expect(index.testData).toHaveLength(2);
        expect(index.testData).toBeInstanceOf(Array);
    });
    test('Each object should have two keys [key, purpose], expect two strings', () => {
        const i = Math.floor(Math.random() * 1);
        expect(index.testData[i]).toEqual(
            expect.objectContaining({
                key: expect.any(String),
                purpose: expect.any(String),
            })
        );
    });
});