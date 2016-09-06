/**
 * Created by mak on 9/6/16.
 */
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const include   = [path.resolve(process.cwd(), './src')];
const bsInclude = [path.resolve(process.cwd(), './node_modules/bootstrap/dist')];
const config = {
  entry: {
    app: ['babel-polyfill', './src/main.js']
  },
  output: {
    path: './dist',
    filename: '/[name].[hash].js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include,
      loader: 'babel',
      query: {
        presets: ['stage-0', 'es2015', 'react'],
        plugins: ['react-html-attrs', 'add-module-exports', 'transform-class-properties']
      }
    }, {
      test: /\.css/,
      include: bsInclude,
      loader: 'style!css'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      include: bsInclude,
      loader: 'file'
    }, {
      test: /\.(woff|woff2)$/,
      include: bsInclude,
      loader:'url?prefix=font/&limit=8192'
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      include: bsInclude,
      loader: 'url?limit=8192&mimetype=application/octet-stream'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      include: bsInclude,
      loader: 'url?limit=8192&mimetype=image/svg+xml'
    }, {
      test: /\.hbs$/,
      include,
      loader: 'handlebars'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.hbs'
    })
  ],
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules']
  }
};

export default config;
