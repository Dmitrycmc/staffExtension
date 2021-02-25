const path = require('path');

module.exports = {
  entry: './src/staff.js',
  watch: true,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'staff.js',
  },
};