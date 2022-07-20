module.exports = {
  siteMetadata: {
    title: 'Caderninho de Receitas',
    description: '',
    author: `@jomarcardoso`,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-firebase-v9.0',
      options: {
        credentials: {
          // apiKey: "<YOUR_FIREBASE_API_KEY>",
          // authDomain: "<YOUR_FIREBASE_AUTH_DOMAIN>",
          // databaseURL: "<YOUR_FIREBASE_DATABASE_URL>",
          // projectId: "<YOUR_FIREBASE_PROJECT_ID>",
          // storageBucket: "<YOUR_FIREBASE_STORAGE_BUCKET>",
          // messagingSenderId: "<YOUR_FIREBASE_MESSAGING_SENDER_ID>",
          // appId: "<YOUR_FIREBASE_APP_ID>",
          // measurementId: "<YOUR_FIREBASE_MEASUREMENT_ID>"
          apiKey: 'AIzaSyDHP6-sAs4qz57wZobWdaeE4DkeugXYR8g',
          authDomain: 'caderninho-de-receitas.firebaseapp.com',
          projectId: 'caderninho-de-receitas',
          storageBucket: 'caderninho-de-receitas.appspot.com',
          messagingSenderId: '909303160702',
          appId: '1:909303160702:web:2b48872dc46031cda4dd2f',
          measurementId: 'G-KFJQN1XXZP',
        },
      },
    },
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
