/* eslint-disable @typescript-eslint/camelcase */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path")
console.log("and again so the language will cahnge lol :) ")

module.exports = {
  siteMetadata: {
    title: `Caroline Artz - Personal Website`,
    description: `All About Caroline Artz`,
    author: `ceartz@gmail.com`,
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    // TODO: disable unneded features when ready to deploy.
    `gatsby-plugin-lodash`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `caroline-artz`,
        short_name: `carolineartz`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/images/favicon.png`,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        allowNamespaces: true,
      },
    },
    {
      resolve: `gatsby-plugin-eslint`,
      options: {
        test: /\.js$|\.jsx$|\.ts$|\.tsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: [`develop`],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: path.resolve(__dirname, `src/assets/svg`),
        },
      },
    },
    {
      resolve: `gatsby-plugin-root-import`,
      options: {
        components: path.join(__dirname, `src/components`),
        pages: path.join(__dirname, `src/pages`),
        utils: path.join(__dirname, `src/utils`),
        assets: path.join(__dirname, `src/assets`),
        hooks: path.join(__dirname, `src/hooks`),
        animation: path.join(__dirname, `src/animation`),
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/AppLayout.tsx`),
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          // TODO: remove ones I don't actually use.
          `Montserrat:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i`,
        ],
        display: `swap`,
      },
    },
  ],
}
