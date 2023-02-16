const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    autoprefixer,
    cssnano({ preset: 'default' }),
    {
      'postcss-preset-env': {
        browsers: 'last 4 versions',
      },
    },
  ],
};
