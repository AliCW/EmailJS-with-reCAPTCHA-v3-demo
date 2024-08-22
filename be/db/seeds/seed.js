const format = require('pg-format');
const db = require('../connection');

const seed = async ({ emailJS, reCAPTCHAv3 }) => {

    await db.query(`DROP TABLE IF EXISTS emailJS`);
    await db.query(`DROP TABLE IF EXISTS reCAPTCHAv3`);

    const emailJSTablePromise = db.query(`
    CREATE TABLE emailJS (
        key VARCHAR PRIMARY KEY,
        type VARCHAR NOT NULL,
        purpose VARCHAR NOT NULL
    );`);

    const reCAPTCHAv3TablePromise = db.query(`
    CREATE TABLE reCAPTCHAv3 (
        key VARCHAR PRIMARY KEY,
        type VARCHAR NOT NULL,
        purpose VARCHAR NOT NULL    
    );`);

    await Promise.all([emailJSTablePromise, reCAPTCHAv3TablePromise]);

    const insertEmailJSQueryString = format(
        `INSERT INTO emailJS (key, type, purpose) VALUES %L RETURNING *;`,
        emailJS.map(({key, type, purpose}) => [key, type, purpose])
    );
    const emailJSPromise = db
        .query(insertEmailJSQueryString)
        .then((result) => result.rows);

    const insertReCAPTCHAv3QueryString = format(
        `INSERT INTO reCAPTCHAv3 (key, type, purpose) VALUES %L RETURNING *;`,
        reCAPTCHAv3.map(({key, type, purpose}) => [key, type, purpose])
    );
    const reCAPTCHAPromise = db
        .query(insertReCAPTCHAv3QueryString)
        .then((result) => result.rows);


    await Promise.all([emailJSPromise, reCAPTCHAPromise]);
};

module.exports = seed;