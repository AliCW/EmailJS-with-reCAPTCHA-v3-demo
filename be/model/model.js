const db = require('../db/connection');

const findPublicKeysType = () => {
    return db
        .query(`
            SELECT key FROM publicKeys;
        `)
        .then(({ rows }) => {
            if(rows.length === 0){
                return Promise.reject({
                    msg: '404 - Not found',
                })
            }
            return rows;
        });
};

const findEmailJSPublicKey = () => {
    return db
        .query(`
            SELECT key from publicKeys
            WHERE purpose = 'emailJS'
        ;`)
        .then(({ rows }) => {
            if(rows.length === 0){
                return Promise.reject({
                    msg: '404 - Not found',
                })
            }
            return rows;
        });
};

const findReCAPTCHAPublicKey = () => {
    return db
        .query(`
            SELECT key from publicKeys
            WHERE purpose = 'reCAPTCHA'
        ;`)
        .then(({ rows }) => {
            if(rows.length === 0){
                return Promise.reject({
                    msg: '404 - Not found',
                })
            }
            return rows;
        });
};


module.exports = {
    findPublicKeysType,
    findEmailJSPublicKey,
    findReCAPTCHAPublicKey,
};