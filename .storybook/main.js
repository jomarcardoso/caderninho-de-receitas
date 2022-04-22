const path = require('path');

// https://duncanleung.com/import-svg-storybook-webpack-loader/

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    // 'storybook-addon-gatsby',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config) => {
    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    // config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]
    // Use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
    // config.module.rules[0].use[0].options.plugins.push(
    //   require.resolve("babel-plugin-remove-graphql-queries")
    // )
    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
        // Creates `style` nodes from JS strings
        'style-loader',
        // Translates CSS into CommonJS
        'css-loader',
        // Compiles Sass to CSS
        'sass-loader',
      ],
    });

    config.resolve.mainFields = ['browser', 'module', 'main'];

    config.resolve.alias['/images'] = path.resolve(
      __dirname,
      '../static/images',
    );

    return config;
  },
};
