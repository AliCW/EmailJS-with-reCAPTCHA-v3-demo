const path = require('path');

module.exports = {
    mode: "development",
    entry: ["regenerator-runtime/runtime.js", "./src/index.js"],
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
      },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
        ],
    },
    devServer: {
        port: 3000,
        static: "./dist",
        historyApiFallback: true,
    },
    resolve: {
        fallback: {
          fs: false,
          path: require.resolve("path-browserify"),
        },
    },
}