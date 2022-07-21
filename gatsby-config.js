module.exports = {
  siteMetadata: {
    title: 'Caderninho de Receitas',
    description: '',
    author: `@jomarcardoso`,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        typekit: {
          id: process.env.TYPEKIT_ID,
        },
      },
    },
    'gatsby-plugin-ts-config',
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
    {
      resolve: `@danbruegge/gatsby-plugin-stylelint`,
      options: {
        files: ['src/**/*.scss'],
      },
    },
    'gatsby-plugin-eslint',
    `gatsby-theme-material-ui`,
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /svg/,
        },
      },
    },
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
        name: `Caderninho de Receitas`,
        short_name: `Caderninho`,
        start_url: `/`,
        background_color: `#f8f8f8`,
        theme_color: `#87695e`,
        display: `standalone`,
        icon: `src/images/logo.png`,
        cache_busting_mode: 'none',
        file_handlers: [
          {
            action: '/',
            accept: {
              'text/json': ['.json'],
            },
          },
        ],
      },
    },
  ],
};
