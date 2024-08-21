const format = require('pg-format');
const db = require('../connection');

const seed = async ({testData}) => {

    await db.query(`DROP TABLE IF EXISTS keys`);

    const keysTablePromise = db.query(`
    CREATE TABLE keys (
        key VARCHAR NOT NULL,
        purpose VARCHAR NOT NULL
    );`);

    await Promise.all([keysTablePromise]);

    const insertKeysQueryString = format(
        `INSERT INTO keys (key, purpose) VALUES %L RETURNING *;`,
        testData.map(({key, purpose}) => [key, purpose])
    );
    return keysPromise = db
        .query(insertKeysQueryString)
        .then((result) => result.rows);

};

module.exports = seed;