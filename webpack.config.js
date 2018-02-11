var path = require('path');

module.exports = {
  entry: './lib/t3.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 't3.bundle.js',
    library: 'T3',
    libraryTarget: 'umd'
  },
  watch: true,
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader'}
    ]
  }
};