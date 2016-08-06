var webpack = require('webpack');
var path = require('path');

var definePlugin = new webpack.DefinePlugin({
  __BUILD__: JSON.stringify(JSON.parse(process.env.BUILD_APP || 'false')),
  __HOT__: JSON.stringify(JSON.parse(process.env.HOT || 'false')),
});

module.exports = {
  module: {
    loaders: []
  },
  plugins: [
    definePlugin
  ]
};


if(process.env.BUILD_APP) {
  module.exports.entry = [
    './app/src/js/app.js'
  ];
  module.exports.module.loaders.push({
    test: /\.js$/,
    exclude: /node_modules/,
    loaders: ['babel-loader?stage=0&optional=runtime&cacheDirectory']
  });
  module.exports.output = {
    path: path.resolve("./app/dist"),
    filename: 'bundle.js',
    publicPath: '/app/dist/'
  };
}



if (process.env.HOT) {
  module.exports.devtool = 'eval';
  // module.exports.entry = [
  //   'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
  //   'webpack/hot/only-dev-server',
  //   './app/src/js/app'
  // ];
  module.exports.entry = path.resolve('app/src/js', 'app.js')
  module.exports.module.loaders.push({
    test: /\.js$/,
    exclude: /node_modules/,
    loaders: ['react-hot', 'babel-loader?stage=0&optional=runtime&cacheDirectory']
  })
  module.exports.output = {
    path: path.resolve("app/dist"),
    filename: 'bundle.js',
    publicPath: '/'
  };
  module.exports.plugins.push(new webpack.HotModuleReplacementPlugin());
}
