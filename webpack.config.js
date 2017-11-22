const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src'),
	entry: {
    'speed-trap': './speed-trap',
    'speed-trap.min': './speed-trap',
    'speed-trap_test': '../tests/spec/speed-trap_test'
  },
  output: {
    filename: '[name].js',
    library: 'SpeedTrap',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    umdNamedDefine: true
  },
  plugins: [
    new UglifyJsPlugin({
      test: /\.min\.js$/
    })
  ]
};