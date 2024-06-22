const path = require('path');
const mix = require('laravel-mix');

mix.js('frontend/src/main.js', 'dist')
   .sass('frontend/src/styles/main.scss', 'dist/styles')
   .vue({
     version: 3,
     options: {
       resolve: {
         alias: {
           '@': path.resolve(__dirname, 'frontend/src'),
           'vue$': 'vue/dist/vue.esm-bundler.js'
         },
         extensions: ['.js', '.vue', '.json']
       }
     }
   })
   .setPublicPath('dist')
   .browserSync({
     proxy: 'http://localhost:3000',
     files: ['frontend/src/**/*.*', 'dist/**/*.*'],
   });

mix.webpackConfig({
   module: {
     rules: [
       {
         test: /\.scss$/,
         use: [
           'vue-style-loader',
           'css-loader',
           'sass-loader'
         ],
         include: path.resolve(__dirname, 'frontend/src')
       }
     ]
   }
});

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
        '@': path.resolve(__dirname, 'frontend/src'),
        'vue$': 'vue/dist/vue.esm-bundler.js'
      },
      extensions: ['.js', '.vue', '.json']
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
};
