module.exports = {
  siteMetadata: {
    title: `Saúde em pontos`,
    description: `Sua saúde em níveis altos`,
    author: `@jomarcardoso`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    'gatsby-plugin-typescript-checker',
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        workboxConfig: {
          globPatterns: ['**/*'],
        },
        precachePages: [`/src/*`],
      },
    },
    'gatsby-plugin-eslint',
    `gatsby-plugin-sass`,
    `gatsby-theme-material-ui`,
    // {
    //   resolve: `gatsby-theme-material-ui`,
    //   options: {
    //     disableAutoprefixing: false,
    //     disableMinification: false,
    //   },
    // },
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-react-svg',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `db`,
        path: `${__dirname}/src/db`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `SAÚDE EM PONTOS`,
        short_name: `Saúde em Pontos`,
        start_url: `/`,
        background_color: `#fffffb`,
        theme_color: `#5f4339`,
        display: `standalone`,
        icon: `src/images/original.png`,
        cache_busting_mode: 'none',
      },
    },
  ],
};
