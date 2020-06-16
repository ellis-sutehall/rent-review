/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: require("./site-metadata.json"),
  plugins: [
    "gatsby-plugin-react-helmet",
    `gatsby-plugin-sass`,
    {
      resolve: "gatsby-source-zoopla",
      options: {
        postcode: "+",
        area: "england",
        listing_status: "rent",
        page_size: "100",
        api_key: "aa2vwdy6yaxnmbrrum32wgh3",
      },
    },
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
