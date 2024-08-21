const {
    findTestKeys
} = require('../model/model.js');

const listTestKeys = (request, response, next) => {
    findTestKeys(request.query).then((keys) => {
        response.status(200).send({keys: keys})
    })
    .catch(next);
};

module.exports = {
    listTestKeys,
};