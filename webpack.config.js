var path = require('path');

module.exports = {
  entry: './lib/t3.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'smbjs.bundle.js',
    library: 'SMBJS',
    libraryTarget: 'umd'
  },
  watch: true,
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader'}
    ]
  }
};