const format = require('pg-format');
const db = require('../connection');

const seed = async ({emailJS}) => {

    await db.query(`DROP TABLE IF EXISTS emailJS`);

    const emailJSTablePromise = db.query(`
    CREATE TABLE emailJS (
        key VARCHAR PRIMARY KEY,
        type VARCHAR NOT NULL,
        purpose VARCHAR NOT NULL
    );`);

    //await Promise.all([keysTablePromise]);
    await emailJSTablePromise;

    const insertEmailJSQueryString = format(
        `INSERT INTO emailJS (key, type, purpose) VALUES %L RETURNING *;`,
        emailJS.map(({key, type, purpose}) => [key, type, purpose])
    );
    return emailJSPromise = db
        .query(insertEmailJSQueryString)
        .then((result) => result.rows);

    //await Promise.all([keysPromise]);

    //await db.query(`DROP TABLE IF EXISTS emailJS`);
    
    // const emailJSPromise = db.query(`
    // CREATE TABLE emailJS (
    //     key VARCHAR PRIMARY KEY,
    //     type VARCHAR NOT NULL,
    //     purpose VARCHAR NOT NULL
    // );`);

};

module.exports = seed;