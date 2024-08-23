const {
    findPublicKeysType,
    findEmailJSPublicKey,
    findReCAPTCHAPublicKey,
    gatherEmailJSCredentials,
} = require('../model/model.js');

const axios = require('axios');

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

const sendEmail = (request, response, next) => {
    gatherEmailJSCredentials(request.query).then((body) => {

        //request.body <<--emailObj
        //body.rows[0].key <<--emailJS private key
        //body.rows[1].key <<--emailJS service_id
        //body.rows[2].key <<--emailJS template_id
        response.status(200).send(body.rows)
    })
    .catch(next);
};

module.exports = {
    listPublicKeys,
    listEmailJSPublicKey,
    listReCAPTCHAPublicKey,
    sendEmail,
};