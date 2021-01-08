const path = require(`path`)

module.exports = {
  siteMetadata: {
    title: `Maksymilian.org`,
    siteUrl: `https://gatsby-starter-luke.netlify.com`,
    description: `GatsbyJS template using TypeScript and React String.`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `maksymilian.org`,
        short_name: `maksymilian-org`,
        start_url: `/`,
        background_color: `#512DA8`,
        theme_color: `#512DA8`,
        display: `minimal-ui`,
        icon: `src/assets/images/favicon-32x32.png`,
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
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#512DA8`,
        showSpinner: false,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_CODE,
      },
    },
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-offline`,
  ],
}
