import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import Head from "../components/head"
import { Link } from "gatsby"

const Results = ({ location }) => {
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")
  const [fetchedData, setFetchedData] = useState("")
  // const [fetchedId, setFetchedId] = useState("")
  // console.log(`Location: ${location.state.search}`)

  useEffect(() => {
    const postcode = location.state.search

    fetch(
      `http://api.zoopla.co.uk/api/v1/property_listings.json?postcode=${postcode}&listing_status=rent&api_key=${process.env.ZOOPLA_API_KEY_ID}`
    )
      .then(response => {
        return response.json()
      })
      .then(json => {
        setFetchedData(json.listing)
        setLoading(false)
        console.log(json)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
        setError(true)
        setFetchedData(false)
        return false
      })
  }, [location.state.search])

  return (
    <Layout location={location}>
      <Head title="Results" />
      <section>
        <div className="container">
          {loading && (
            <progress class="progress is-primary" value="15" max="100">
              15%
            </progress>
          )}
          {error && <p>An error occurred, please try again later</p>}
          {fetchedData &&
            fetchedData.map((listing, i) => {
              return (
                <div>
                  <Link
                    state={{
                      listingId: listing.listing_id,
                      thumbnailUrl: listing.thumbnail_url,
                      displayableAddress: listing.displayable_address,
                      shortDescription: listing.short_description,
                      listingStatus: listing.listing_status,
                      postTown: listing.post_town,
                      price: listing.price,
                      imageUrl: listing.image_url,
                      imageCaption: listing.image_caption,
                      agentLogo: listing.agent_logo,
                      agentName: listing.agent_name,
                    }}
                    to={`property/${listing.listing_id}`}
                  >
                    <img src={listing.thumbnail_url} alt="" />
                    <p key={i}>{listing.displayable_address}</p>
                    <p key={i}>{listing.short_description}</p>
                    <p key={i}>{listing.listing_status}</p>
                    <p key={i}>{listing.post_town}</p>
                    <p key={i}>{listing.price}</p>
                  </Link>
                </div>
              )
            })}
        </div>
      </section>
    </Layout>
  )
}

export default Results
