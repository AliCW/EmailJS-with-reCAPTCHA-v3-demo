const express = require('express');
const app = express();
var bodyParser = require("body-parser");
const cors = require('cors');

const {
    apiRouter,
} = require('./routers/routes');

app.use(cors());

app.use(express.json());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api", apiRouter);

app.all("/*", (request, response, next) => {
    response.status(404).send({msg: "Not found"});
    next();
});

app.use((error, request, response, next) => {

    console.error(error, "error<<");

})

module.exports = app;