const db = require('../db/connection');

const findTestKeys = () => {
    return db
        .query(
            `SELECT * FROM keys;`
        )
        .then(({ rows }) => {
            return rows;
        });
};

module.exports = {
    findTestKeys,
};