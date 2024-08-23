const { gatherEmailJSCredentials } = require('../model/model');
const db = require('../db/connection');

afterAll(() => db.end());

describe('PSQL test for retrieving data for emailJS IDs', () => {
    test('Confirm the return array is a maximum length of 2', () => {
        return gatherEmailJSCredentials().then(( result  ) => {
            console.log(result.rows)
            expect(result.rows).toBeInstanceOf(Array);
            expect(result.rows).toHaveLength(3);
        })
    });
});

describe('PSQL test for retrieving data for emailJS IDs', () => {
    test('Confirm the return array has both "key" & "type" value pairs', () => {
        return gatherEmailJSCredentials().then(( result  ) => {
            expect(Object.keys(result.rows[0])).toEqual(['key', 'type']);
            expect(Object.keys(result.rows[1])).toEqual(['key', 'type']);
            expect(Object.keys(result.rows[2])).toEqual(['key', 'type']);
        })
    });
});



describe('PSQL test for retrieving data for emailJS IDs', () => {
    test('Request both keys, check validity & the order of receipt', () => {
        return gatherEmailJSCredentials().then(( result ) => {
            expect(result.rows[0].key).toBe('fv5tbt561242104520t4vu76i');            
            expect(result.rows[1].key).toBe('this_is_my_service_id');
            expect(result.rows[2].key).toBe('this_is_my_template_id');
        })
    });
});


//change SQL function to get public key & private key for emailJS