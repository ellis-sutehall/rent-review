const fetch = require("node-fetch")
const queryString = require("query-string")
exports.sourceNodes = (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions
  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins

  const proccessListing = listing => {
    const nodeId = createNodeId(`property-${listing.listing_id}`)
    const nodeContent = JSON.stringify(listing)
    const nodeData = Object.assign({}, listing, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `Property`,
        content: nodeContent,
        contentDigest: createContentDigest(listing),
      },
    })
    return nodeData
  }

  // plugin code goes here...
  console.log("Testing my plugin", configOptions)
  // Convert the options object into a query string
  let apiOptions = queryString.stringify(configOptions)
  console.log(`API Options: ${apiOptions}`)
  apiOptions = apiOptions.split("&")
  apiOptions = apiOptions.reverse()
  apiOptions = apiOptions.join("&")
  // Join apiOptions with the Zoopla API URL
  const apiUrl = `http://api.zoopla.co.uk/api/v1/property_listings.json?${apiOptions}`
  // Gatsby expects sourceNodes to return a promise
  return (
    // Fetch a response from the apiUrl
    fetch(apiUrl)
      // Parse the response as JSON
      .then(response => response.json())
      // Process the JSON data into a node
      .then(data => {
        const results = data.listing
        // For each query result (or 'hit')
        results.forEach(listing => {
          const nodeData = proccessListing(listing)
          createNode(nodeData)
          console.log("Listing data is:", listing)
        })
      })
  )
}
