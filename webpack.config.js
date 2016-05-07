module.exports = {
  context: __dirname,
  entry: './demo/index',
  devtool: 'source-map',
  output: {
    path: 'dist',
    filename: 'index.js',
    library: 'twentyTwentyDemo',
    libraryTarget: 'umd',
    publicPath: '/dist',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },
  devServer: {
    host: '0.0.0.0',
  },
};
