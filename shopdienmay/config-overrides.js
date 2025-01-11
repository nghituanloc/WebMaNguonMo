const { override } = require('customize-cra');

module.exports = override((config) => {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    url: require.resolve('url/'),
  };
  return config;
});
