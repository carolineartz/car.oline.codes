// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Ueno Gatsby Starter',
  },
  plugins: [
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-ueno',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'ueno-gatsby-starter',
        // eslint-disable-next-line @typescript-eslint/camelcase
        short_name: 'starter',
        // eslint-disable-next-line @typescript-eslint/camelcase
        start_url: '/',
        // eslint-disable-next-line @typescript-eslint/camelcase
        background_color: '#663399',
        // eslint-disable-next-line @typescript-eslint/camelcase
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/assets/images/favicon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: path.resolve(__dirname, 'src/assets/svg'),
        },
      },
    },
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/components/app-layout/AppLayout.tsx'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'fonts',
        path: `${__dirname}/src/fonts/`,
      },
    },
  ],
};
