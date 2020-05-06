const { override, addBabelPlugins } = require('customize-cra')

/* config-overrides.js */
module.exports = override(
  process.env.NODE_ENV === 'production' &&
    addBabelPlugins('babel-plugin-react-remove-properties')
)
