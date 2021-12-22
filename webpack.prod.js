/*  */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    output: {
        clean: true,
        /* poner un hash al main.js */
        filename: 'main.[contenthash].js'
    },
    module: {
        rules: [
            /* {
                        test: /\.html$/,
                        loader: 'html-loader',
                        options: {
                            attributes: false,
                        }
                    }, */
            {
                /* configuracion le decimos que
                busque todos los archivos con 
                extencion html y use html-loader
                para procesarlo
                */
                test: /\.html$/i,
                loader: 'html-loader',
                /* en options le decimos que queremos configurar algunas 
                cosas manualmente como la carga de imaagnes etc */
                options: {
                    sources: false
                }
                /*  si se necesita configurar 
                options: {minimize:true}
                */
            }, {
                test: /\.css$/i,
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    /* configuracion para minimifar archivos css */
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    },
    plugins: [
        /* añadimos la configuracion para que webpack
        tome el html y lo ponga en el dist */
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        /* configuramos el nombre que tendra el css global
        tambien le decimos que tenga el nombre con hash para evitar 
        problemas de cache */
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),
        /* configuracion para copiar archivos estatis poner ruta 
        origen y destino */
        new CopyPlugin({
            patterns: [{
                from: 'src/assets/',
                to: 'assets/'
            }]
        }),
        /*  new CssMinimizerPlugin({

         }),
         new TerserPlugin({

         }) */

    ]
}