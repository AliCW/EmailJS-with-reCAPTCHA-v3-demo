const {
    findPublicKeysType,
    findEmailJSPublicKey,
    findReCAPTCHAPublicKey,
} = require('../model/model.js');

const listPublicKeys = (request, response, next) => {
    findPublicKeysType(request.query).then((types) => {
        response.status(200).send({type: types});
    })
    .catch(next);
};

const listEmailJSPublicKey = (request, response, next) => {
    findEmailJSPublicKey(request.query).then((key) => {
        response.status(200).send({"key": key});
    })
    .catch(next);
};

const listReCAPTCHAPublicKey = (request, response, next) => {
    findReCAPTCHAPublicKey(request.query).then((key) => {
        response.status(200).send({"key": key});
    })
    .catch(next);
};

module.exports = {
    listPublicKeys,
    listEmailJSPublicKey,
    listReCAPTCHAPublicKey,
};