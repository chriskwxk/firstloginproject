const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ]
})
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()]
  }
};