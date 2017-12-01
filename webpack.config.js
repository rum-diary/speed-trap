const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname),
	entry: {
    'speed-trap': './index',
    'speed-trap.min': './index',
    'speed-trap_test': './tests/spec/speed-trap_test'
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
