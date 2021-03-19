const path = require('path');

module.exports = env => {
  const inProduction = env.production
  return {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ]}, 
        { test: /\.jpe?g$|\.gif$|\.png$|\.PNG$|\.svg$|\.woff(2)?$|\.ttf$|\.eot$/,
          use: {
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    fallback: 'file-loader',
                    name: '[name].[ext]',
                    publicPath: 'assets/',
                    outputPath: 'assets/img/'
                }
            }
        }
      ] 
    }
  }
};