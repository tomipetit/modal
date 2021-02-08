"use strict";
const path = require("path");
const webpack = require("webpack");
const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const mqpacker = require("css-mqpacker");
const cssDeclarationSorter = require('css-declaration-sorter');

const exportPath = 'dist/'

module.exports = (env, argv) => ({
  devtool: false,
  entry: {
    modal: path.join(__dirname, "src/js/modal.js"),
  },
  resolve: {
    extensions: ['.js', '.css', '.scss'],
    modules: [path.join(__dirname, "dev"), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            }
          },
          'resolve-url-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  postcssImport(),
                  autoprefixer({
                    grid: true
                  }),
                  cssDeclarationSorter({
                    order: 'smacss'
                  }),
                  mqpacker()
                ]
              }
            }
          },
        ]
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            }
          },
          'resolve-url-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  postcssImport(),
                  autoprefixer({
                    grid: true
                  }),
                  cssDeclarationSorter({
                    order: 'smacss'
                  }),
                  mqpacker()
                ]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [{
          loader: 'url-loader',
        }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'entry',
                    corejs: {
                      version: 3,
                    }
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
        }]
      },
    ]
  },
  plugins: [
  ],
})