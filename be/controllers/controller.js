const {
    findPublicKeysType,
    findReCAPTCHAPublicKey,
    gatherEmailJSCredentials,
    gatherReCAPTCHAPrivateKey,
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
        response.status(200).send(body.rows);
    })
    .catch(next);
};

const checkReCAPTCHA = (request, response, next) => {
    gatherReCAPTCHAPrivateKey(request.query).then(( { rows } ) => {
    return axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${rows[0].key}&response=${request.body.props}`,
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
          },
        },
      );

    }).then(({data}) => {
        if (data.success === true) response.status(200).send({ "data": data });
        if (data.success === false) response.status(498).send({ "data": data });
    });
};

module.exports = {
    listPublicKeys,
    listEmailJSPublicKey,
    listReCAPTCHAPublicKey,
    sendEmail,
    checkReCAPTCHA,
};