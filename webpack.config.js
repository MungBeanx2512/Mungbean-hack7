const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const webpack = require('webpack');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.resolve.alias['crypto'] = 'crypto-browserify';
  config.resolve.alias['stream'] = 'stream-browserify';
  config.resolve.alias['process'] = 'process';

  // Exclude 'http' from the fallback list if you don't want to polyfill it
  config.resolve.fallback = {
    ...config.resolve.fallback,
    'http': false,
    'https': false,
    'zlib': false
  };

  config.plugins.push(new webpack.ProvidePlugin({
    process: "process",
    Buffer: ["buffer", "Buffer"],
  }));

  if (config.mode === 'development') {
    config.devServer.compress = false;
  }

  if (config.mode === 'production') {
    config.optimization.minimize = false;
  }

  return config;
};
