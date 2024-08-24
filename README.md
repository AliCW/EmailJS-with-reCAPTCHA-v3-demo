# EmailJS-with-reCAPTCHA-v3-demo

## Backend

    npm init

In package.json Set "main" as "listen.js" & create the file

`const app = require('./app.js');`
`const { PORT = 9090 } = process.env;`

`app.listen(PORT, () => console.log(``Listening on ${PORT}...``));`

Install pg

    npm install pg  

Install pg-format

    npm install pg-format

Install express

    npm install express

Install cors

    npm install cors

Create .gitignore & add /node_modules

Install dotenv

    npm install dotenv

Create .env.development file

    PGDATABASE=database_name

Create the folder structure

`/controllers` `/controllers/controller.js` - leave file blank for now

Create `/app.js`

`const express = require('express');`
`const app = express();`
`const cors = require('cors');`

`const {`
`    apiRouter,`
`} = require('./routers/testRoutes');`

`app.use(cors());`

`app.use(express.json());`

`app.use("/api", apiRouter);`

`module.exports = app;`

Create `/db` `/db/data` `/db/seeds` - folders, add `/db/data` to .gitignore

Create `/db/connection.js` & insert the below:

`const { Pool } = require('pg');`
`const ENV = process.env.NODE_ENV || 'development';`

`require('dotenv').config({`
  `path: ``${__dirname}/../.env.${ENV}``,`
`});`

`if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {`
`	throw new Error('PGDATABASE or DATABASE_URL not set');`
`}`

`const config = {}`

`if (ENV === "test") {` <-- change as per .env config
`  config.connectionString = process.env.DATABASE_URL`
`  config.max = 2`
`}`

`module.exports = new Pool(config);`


`/db/setup.sql` & insert the below:

`DROP DATABASE IF EXISTS nc_news_test;`
`DROP DATABASE IF EXISTS nc_news;`

`CREATE DATABASE nc_news_test;`
`CREATE DATABASE nc_news;`

`/model/` & `/model/model.js` - leave blank for now

Create the seed file & test data files for pg

Create `/db/data/test-data/keys.js` & add the below code:

`modules.exports = [`
`    {`
`        key: 'this_is_my_test_key',`
`        purpose: 'emailJS',`
`    },`
`    {`
`        key: 'this_is_my_reCAPTCHA_key',`
`        purpose: 'reCAPTCHA',`
`    }`
`]`

Create `/db/data/test-data/index.js` & add the below code:

`exports.testData = require('./keys');`

Create `/db/seeds/seed.js` & `/db/seeds/run-seed.js`

`seed.js` - example code:

`await db.query(``DROP TABLE IF EXISTS keys``);` - drop any tables

`const format = require('pg-format');`
`const db = require('../connection');`

`const seed = async ({testData}) => {` <--Confirm arg name for objectification

`    await db.query(``DROP TABLE IF EXISTS keys``);`

`    const keysTablePromise = db.query(`
`    CREATE TABLE keys (`
`        id SERIAL PRIMARY KEY,`
`        key VARCHAR NOT NULL,`
`        purpose VARCHAR NOT NULL`
`    );``);`

`    await Promise.all([keysTablePromise]);`

`    const insertKeysQueryString = format(`
`        ``INSERT INTO keys (key, purpose) VALUES %L RETURNING*;``,`
`        keyData.map(({key, purpose}) => [key, purpose])`
`    );`
`    return keysPromise = db`
`        .query(insertKeysQueryString)`
`        .then((result) => result.rows);`

`    //await Promise.all([keysPromise]);`

`};`

`module.exports = seed;`

run-seed.js example code

`const testData = require('../data/test-data/keys.js');`
`const seed = require('./seed.js');`
`const db = require('../connection.js');`

`const success = () => { console.log('seeding successful'); };`

`const runSeed = () => {`
`    console.log('running seed');`
`    return seed(testData).then(() =>`
`        db.end()).then(() => `
            `success())`
`};`


`runSeed();`


Add the below to `scripts` in the `package.json` & save

`"start": "node listen.js",`
`"seed": "node ./db/seeds/run-seed.js",`
`"setup-dbs": "psql -f ./db/setup.sql"`

Create the databases

    npm run setup-dbs

Seed databases

    npm run seed

Test if it worked - create a query file - `query.sql` & ass the below connection string & command

`\c emailjs_demo_test`

`SELECT * FROM keys;`

Add the script command to `package.json`

`"scripts": {`
`"query": "psql -f query.sql > result.txt"`
`}`

Run the query and check the result file

    npm run query

-------------

Install test suite:

Install jest as dev dependency

    npm -D install jest

Install jest-extended

    npm -D install jest-extended

Install supertest

    npm -D install supertest

Change `"scripts"` in `package.json` to add test command

`"scripts": {`
`"test": "jest"`
`}`

& Add jest steup in `package.json`

`"jest": {`
`"setupFilesAfterEnv": [`
`    "jest-extended/all",`
`    "./testSetup.js"`
`]`
`}`

Create testSetup.js file` & add test modules

`require('jest');`
`require('jest-extended');`
`require('supertest');`

Create `/be/__tests__/` folder & test file

Navigate to folder & type below to run each test file

    npm test <my_test_file_name.js>

--------------------MODEL--CONTROLLER--ROUTERS-------------------

Create basic search function on `model.js` file

`const db = require('../db/connection');`

`const listTestKeys = () => {`
`    return db`
`        .query(`
            `SELECT * FROM keys;`
`        )`
`        .then(({ rows }) => {`
                `return Promise.reject({`
                    `msg: '404 - Not found',`
                `})`
            `}`
`            return rows;`
`        });`
`};`

`module.exports = {`
`    listTestKeys,`
`};`

Create `/routers/` & `/routers/testRoutes.js`

`const express = require('express');`
`const apiRouter = express.Router();`

`const {`
`    listTestKeys`
`} = require('../controllers/controller');`

`apiRouter.get('/test', listTestKeys);`

`module.exports = { apiRouter };`

Create `/controllers` & `/controllers/controller.js`

`const {`
`    findTestKeys`
`} = require('../model/model.js');`

`const listTestKeys = (request, response, next) => {`
`    findTestKeys(request.query).then((keys) => {`
`        response.status(200).send({keys: keys})`
`    })`
`    .catch(next);`
`};`

`module.exports = {`
`    listTestKeys,`
`};`

Should be able to start the backend & http://127.0.0.1:9090/api/test should give your test data


--->> re-seed the secret keys into their own table - only POST requests taken









## Frontend

    npm init

    npm install react

create .gitignore - ignore node_modules

create folder structure - ./dist ./src ./src/background ./src/components ./src/utils

Install babel

    npm install @babel/core

Install path-browserify

    npm install path-browserify

Install @babel/preset-env

    npm install @babel/preset-env

Install @babel/preset-react

    npm install @babel/preset-react

Install style-loader

    npm install style-loader

Install CSS loader

    npm install css-loader

Install react-router-dom

    npm install react-router-dom

Install webpack

    npm install webpack

Install webpack client

    npm install -D webpack-cli

Install webpack dev-server

    npm install -D webpack-dev-server

create `webpack.config.js` file in /fe root - allows you to use all npm packages by including polyfills

`const path = require('path');`

`module.exports = {`
`    mode: "development",`
`    entry: "./src/index.js"`
`    output: {`
`        path: path.resolve(__dirname, "dist"),`
`        publicPath: "/",`
`      },`
`    module: {`
`        rules: [`
`            {`
`                test: /\.css$/i,`
`                use: ["style-loader", "css-loader"],`
`            },`
`            {`
`                test: /\.js|jsx$/,`
`                exclude: /node_modules/,`
`                use: {`
`                    loader: "babel-loader",`
`                    options: {`
`                        presets: ["@babel/preset-env", "@babel/preset-react"],`
`                    },`
`                },`
`            },`
`        ],`
`    },`
`    devServer: {`
`        port: 3000,`
`        static: "./dist",`
`        historyApiFallback: true,`
`    },`
`    resolve: {`
`        fallback: {`
`          fs: false,`
`          path: require.resolve("path-browserify"),`
`        },`
`    },`
`}`

create `.babelrc` in ./fe root

`{`
`  "plugins": ["@babel/syntax-dynamic-import"],`
`  "presets": [`
`    [`
`      "@babel/preset-env",`
`      {`
`        "modules": false`
`      }`
`    ]`
`  ]`
`}`

create basic files - ./src/index.js

`import _ from 'lodash';`
`import React from 'react';`
`import ReactDOM from 'react-dom/client';`
`import { BrowserRouter } from 'react-router-dom'`
`import App from './App.js';`

`window.addEventListener("DOMContentLoaded", function (e) {`
`    ReactDOM.createRoot(document.getElementById('root')).render(`
`        <BrowserRouter>`
`            <App/>`
`        </BrowserRouter>`
`    );`
`});`

create ./src/App.js

`import React from 'react';`
`import { Route, Routes } from 'react-router-dom';`
`import Main from './components/Main.jsx';`
`import css from './App.css';`

`export default function App(){`
`    return (`
`        <div className="App">`
`            <Routes>`
`                <Route path="/" element={<Main />} />`
`            </Routes>`
`        </div>`
`    )`
`}`

create ./src/App.css

`.App{`
`    text-align: center;`
`}`

create ./src/components/Main.jsx

create ./dist/index.html

`<!DOCTYPE html>`
`<html>`
`  <head>`
`    <meta charset="utf-8" />`
`    <title>reCAPTCHAv3 demo</title>`
`  </head>`
`  <body>`
`    <div id="root"></div>`
`    <script src="main.js"></script>`
`  </body>`
`</html>`

change package.json "scripts" object

`  "scripts": {`
`    "test": "echo \"Error: no test specified\" && exit 1",`
`    "start": "webpack serve",`
`    "build": "webpack"`
`  },`

Build the skeleton code

    npm run build

Start the server to test

    npm start

Install axios

    npm install axios

Install emailJS

    npm install @emailjs/browser

Install react spinners

    npm install react-spinners

Install react-hot-toast

    npm install react-hot-toast

Install react-checkmark

    npm install react-checkmark

Setup email-JS - sign in & connect account - make note of serivce-ID
Look at Email Templates & make note of the template-ID

https://www.emailjs.com/docs/sdk/send/

Add IDs & keys to database