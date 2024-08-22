const db = require('../db/connection');

const findTestKeys = () => {
    return db
        .query(
            `SELECT * FROM keys;`
        )
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
    findTestKeys,
};