const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const debug = process.env.NODE_ENV !== 'production'
module.exports = {
    baseUrl: '',
    lintOnSave: false,
    devServer: {
        port: 9000
    },
    css: {
        modules: false
    },
    filenameHashing: false,
    productionSourceMap: false,
    configureWebpack: {
        output: {
            sourcePrefix: ' '
        },
        amd: {
            toUrlUndefined: true
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': path.resolve('src')
            }
        },
        plugins: [
        ],
        module: {
            unknownContextCritical: /^.\/.*$/,
            unknownContextCritical: false
        }
    }
}