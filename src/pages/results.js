import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import Head from "../components/head"
import { Link } from "gatsby"

const Results = ({ location }) => {
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")
  const [fetchedData, setFetchedData] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  // const [fetchedId, setFetchedId] = useState("")
  // console.log(`Location: ${location.state.search}`)

  useEffect(() => {
    const postcode = location.state.search
    const getAllResults = () => {
      fetch(
        `http://api.zoopla.co.uk/api/v1/property_listings.json?postcode=${postcode}&page_number=${currentPage}&listing_status=rent&api_key=${process.env.ZOOPLA_API_KEY_ID}`
      )
        .then(response => {
          return response.json()
        })
        .then(json => {
          setFetchedData(json)
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
    }
    getAllResults()
  }, [location.state.search, currentPage])

  // Conditionally load next button if fetchedData valid
  const nextPageButton = () => {
    if (fetchedData && fetchedData.result_count > 10) {
      return (
        <button className="button" id="next" onClick={nextPage}>
          Next
        </button>
      )
    }
  }
  const nextPage = () => {
    setCurrentPage(currentPage + 1)
  }
  // Display previous button if not on page 1
  const prevPageButton = () => {
    if (currentPage > 1) {
      return (
        <button className="button" id="next" onClick={prevPage}>
          Previous
        </button>
      )
    }
  }
  const prevPage = () => {
    setCurrentPage(currentPage - 1)
  }

  const pageButtons = () => {
    // Result count divided by page_size, this might change
    let numberOfPages = fetchedData && fetchedData.result_count / 10
    numberOfPages = Math.ceil(numberOfPages)
    let buttonsArr = []
    for (let index = 1; index < numberOfPages; index++) {
      buttonsArr.push(index)
    }
    return buttonsArr
  }
  pageButtons()
  console.log(pageButtons())

  useEffect(() => {
    const handlePageButtons = () => {
      const buttons = document.querySelectorAll(".page-buttons")
      buttons.forEach(button => {
        button.addEventListener("click", function(e) {
          setCurrentPage(e.target.getAttribute("data-page-number"))
        })
      })
    }
    handlePageButtons()
  })

  return (
    <Layout location={location}>
      <Head title="Results" />
      <section className="section results">
        <div className="container">
          {loading && (
            <progress class="progress is-primary" value="15" max="100">
              15%
            </progress>
          )}
          {error && <p>An error occurred, please try again later</p>}
          {fetchedData && fetchedData.result_count === 0 ? (
            <div>
              <h2 className="title is-2">No results found</h2>
              <p>Your search didn't return any results, please try again.</p>
            </div>
          ) : (
            <div className="grid-container">
              {fetchedData &&
                fetchedData.listing.map((listing, index) => {
                  return (
                    <Link
                      className="property-link"
                      key={index}
                      state={{
                        listingId: listing.listing_id,
                        propertyType: listing.property_type,
                        numBedrooms: listing.num_bedrooms,
                        displayableAddress: listing.displayable_address,
                        shortDescription: listing.short_description,
                        listingStatus: listing.listing_status,
                        postTown: listing.post_town,
                        price: listing.price,
                        imageUrl: listing.image_645_430_url,
                        imageCaption: listing.image_caption,
                        agentLogo: listing.agent_logo,
                        agentName: listing.agent_name,
                      }}
                      to={`property/${listing.listing_id}`}
                    >
                      <div className="card">
                        <div className="card-image">
                          <figure className="image is-4by3">
                            <img src={listing.image_645_430_url} alt="" />
                          </figure>
                        </div>
                        <div className="card-content">
                          <div className="content">
                            <h2 className="title is-4">
                              {listing.num_bedrooms} bedroom{" "}
                              {listing.property_type}
                            </h2>
                            <p>{listing.displayable_address}</p>
                            <p>£{listing.price}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
            </div>
          )}

          {fetchedData && prevPageButton()}
          {pageButtons().map(index => {
            return (
              <button className="button page-buttons" data-page-number={index}>
                {index}
              </button>
            )
          })}
          {nextPageButton()}
        </div>
      </section>
    </Layout>
  )
}

export default Results
