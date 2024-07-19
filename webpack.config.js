const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/, // Aplicar loaders a archivos .css
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i, // Aplicar loader a archivos de imagen
                type: "asset/resource",
              },
        ]
    },
    devServer: {
        static: {
          directory: path.join(__dirname, "dist"),
        },
        compress: true,
        port: 9000,
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: "./src/index.html", // Ruta al archivo HTML de plantilla
          filename: "index.html", // Nombre del archivo HTML generado
        }),
      ],
}