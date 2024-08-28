const express = require('express');
const apiRouter = express.Router();

const {
    listPublicKeys,
    listReCAPTCHAPublicKey,
    sendEmail,
    checkReCAPTCHA,
} = require('../controllers/controller');

apiRouter.get('/all/public_keys', listPublicKeys);

apiRouter.get('/reCAPTCHA/public_key', listReCAPTCHAPublicKey);

apiRouter.get('/send_email', sendEmail);

apiRouter.post('/reCAPTCHA/check', checkReCAPTCHA);

module.exports = { apiRouter };