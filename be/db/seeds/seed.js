const format = require('pg-format');
const db = require('../connection');

const seed = async ({ publicKeys, privateKeys }) => {

    await db.query(`DROP TABLE IF EXISTS publicKeys`);
    await db.query(`DROP TABLE IF EXISTS privateKeys`);

    const publicKeysTablePromise = db.query(`
    CREATE TABLE publicKeys (
        key VARCHAR PRIMARY KEY,
        type VARCHAR NOT NULL,
        purpose VARCHAR NOT NULL
    );`);

    const privateKeysTablePromise = db.query(`
    CREATE TABLE privateKeys (
        key VARCHAR PRIMARY KEY,
        type VARCHAR NOT NULL,
        purpose VARCHAR NOT NULL    
    );`);

    await Promise.all([publicKeysTablePromise, privateKeysTablePromise]);

    const insertPublicKeysQueryString = format(
        `INSERT INTO publicKeys (key, type, purpose) VALUES %L RETURNING *;`,
        publicKeys.map(({key, type, purpose}) => [key, type, purpose])
    );
    const publicKeysPromise = db
        .query(insertPublicKeysQueryString)
        .then((result) => result.rows);

    const insertPrivateKeysQueryString = format(
        `INSERT INTO privateKeys (key, type, purpose) VALUES %L RETURNING *;`,
        privateKeys.map(({key, type, purpose}) => [key, type, purpose])
    );
    const privateKeysPromise = db
        .query(insertPrivateKeysQueryString)
        .then((result) => result.rows);


    await Promise.all([publicKeysPromise, privateKeysPromise]);
};

module.exports = seed;