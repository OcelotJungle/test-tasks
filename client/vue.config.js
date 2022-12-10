const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^(/dishes|/api)': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})
