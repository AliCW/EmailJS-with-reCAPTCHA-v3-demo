const express = require('express');
const apiRouter = express.Router();

const {
    listEmailJSType
} = require('../controllers/controller');

apiRouter.get('/emailJS/type', listEmailJSType);

module.exports = { apiRouter };