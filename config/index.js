'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    env: require('./dev.env'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/Baide': {
        target: 'http://dev.prdblog.com',
        changeOrigin: true,
        pathRewrite: {}
      },
      '/Wordcup': {
        target: 'http://dev.prdblog.com',
        changeOrigin: true,
        pathRewrite: {}
      }
    },
    
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    
    useEslint: true,
    
    showEslintErrorsInOverlay: false,
    
    devtool: 'cheap-module-eval-source-map',
    
    cacheBusting: true,

    cssSourceMap: false
  },

  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    
    productionSourceMap: true,
    
    devtool: '#source-map',
    
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
