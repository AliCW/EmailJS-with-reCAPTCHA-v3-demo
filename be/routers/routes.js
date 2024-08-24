const express = require('express');
const apiRouter = express.Router();

const {
    listPublicKeys,
    listEmailJSPublicKey,
    listReCAPTCHAPublicKey,
    sendEmail,
} = require('../controllers/controller');

apiRouter.get('/all/public_keys', listPublicKeys);

apiRouter.get('/email_js/public_key', listEmailJSPublicKey);

apiRouter.get('/reCAPTCHA/public_key', listReCAPTCHAPublicKey);

apiRouter.get('/send_email', sendEmail);

module.exports = { apiRouter };