const path = require(`path`)

module.exports = {
  siteMetadata: {
    title: `Gatsby Starter Luke`,
    siteUrl: `https://gatsby-starter-luke.netlify.com`,
    description: `An opinionated GatsbyJS starter using TypeScript and React String.`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `maksymilian.org`,
        short_name: `maksymilian-org`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#BD003D`,
        display: `minimal-ui`,
        icon: `src/assets/images/favicon.png`,
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
        color: `#BD003D`,
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
