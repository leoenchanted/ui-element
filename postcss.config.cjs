const { beforeEach } = require('node:test')

/*eslint-env node*/
module.exports = {
  plugins: {
    'postcss-each-variables': {},
    'postcss-nested': {},
    'postcss-each': {
      plugins: {
        beforeEach:[
          require('postcss-for'),
          require('postcss-color-mix')
        ]
      }
    }
  }
}