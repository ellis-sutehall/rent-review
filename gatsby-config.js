/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: require("./site-metadata.json"),
  plugins: [
    "gatsby-plugin-react-helmet",
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/property/*`] },
    },
    // {
    //   resolve: "gatsby-source-zoopla",
    //   options: {
    //     postcode: "+",
    //     area: "england",
    //     listing_status: "rent",
    //     page_size: "100",
    //     api_key: process.env.ZOOPLA_API_KEY_ID,
    //   },
    // },
    "gatsby-transformer-yaml",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/data/reviews`,
        name: "reviews",
      },
    },
  ],
}
