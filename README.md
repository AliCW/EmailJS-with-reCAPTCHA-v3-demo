# EmailJS-with-reCAPTCHA-v3-demo

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
`    import React from 'react';`
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

