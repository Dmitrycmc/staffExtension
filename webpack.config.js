const path = require('path');

const backgroundConfig = {
  entry: './src/background.js',
  watch: true,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'background.js',
  },
}

const extensionConfig = {
  entry: './src/index.js',
  watch: true,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'staff.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
}

module.exports = [backgroundConfig, extensionConfig];
