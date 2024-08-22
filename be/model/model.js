const db = require('../db/connection');

const findEmailJSType = () => {
    return db
        .query(
            `SELECT type FROM emailJS;`
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
    findEmailJSType,
};