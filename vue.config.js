const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, './dist'),
  publicPath: '/',
  pages: {
    index: {
      entry: 'frontend/src/main.js',
      template: 'frontend/src/index.html',
      filename: 'index.html'
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'frontend/src')
      },      
      extensions: ['.js', '.vue', '.json'],
      modules: [path.resolve(__dirname, 'node_modules')]
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
};
