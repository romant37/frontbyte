const path = require('path')
const { paths } = require('react-app-rewired')
const rewireAliases = require('react-app-rewire-aliases')

/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireAliases.aliasesOptions({
    'api': path.resolve(__dirname, `${paths.appSrc}/api/`),
    'assets': path.resolve(__dirname, `${paths.appSrc}/assets/`),
    'components': path.resolve(__dirname, `${paths.appSrc}/components/`),
    'reducers': path.resolve(__dirname, `${paths.appSrc}/reducers/`),
    'modules': path.resolve(__dirname, `${paths.appSrc}/modules/`),
    'utils': path.resolve(__dirname, `${paths.appSrc}/utils/`),
  })(config, env);
  return config;
}