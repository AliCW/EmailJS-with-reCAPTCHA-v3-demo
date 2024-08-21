const express = require('express');
const apiRouter = express.Router();

const {
    listTestKeys
} = require('../controllers/controller');

apiRouter.get('/test', listTestKeys);

module.exports = { apiRouter };