const path = require('path');

module.exports = {
  entry: './src/staff.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'staff.js',
  },
};
