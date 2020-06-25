import React, { useState, useEffect } from "react"
import Layout from "../../components/layout"
import Head from "../../components/head"
import HeadingOne from "../../components/headingOne"
import Review from "../../components/review"
import ReviewForm from "../../components/reviewForm"
import StarRating from "../../components/starRating"

const Property = ({ props, location, data }) => {
  const [fetchedProperty, setFetchedProperty] = useState("")
  const [fetchedReviews, setFetchedReviews] = useState([])
  const [formSubmit, setFormSubmit] = useState("form-not-submitted")
  const [notification, setNotification] = useState("")
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")

  let listingId
  if (location.state !== null) {
    listingId = location.state.listingId
  } else {
    listingId = location.pathname
    listingId = listingId.split("/")
    listingId = listingId[2]
  }

  // Get single property from url if page navigated to directly ie not from results page
  const getSingleProperty = () => {
    const propertyUrl = `http://api.zoopla.co.uk/api/v1/property_listings.json?listing_id=${listingId}&api_key=${process.env.ZOOPLA_API_KEY_ID}`
    fetch(propertyUrl)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject(response.status)
        }
      })
      .then(json => {
        setFetchedProperty(json.listing)
        setLoading(false)
        console.log(json.listing)
      })
      .catch(error => {
        console.log(`Error from API: ${error}`)
        setLoading(false)
        setError(true)
        setFetchedProperty(false)
        // navigate("/404")
        return false
      })
  }

  useEffect(() => {
    // If location state null then user has arrived on page directly, call function to get property
    if (location.state === null) {
      getSingleProperty()
    }
  }, [location.state])

  useEffect(() => {
    // Function to call all review from Strapi API - Sets headers with JWT to authorise
    const getReviews = () => {
      const myHeaders = new Headers()
      myHeaders.append(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZThkYmMwOGVkY2JlM2U2Y2IyMjU4ZiIsImlhdCI6MTU5MjMxOTcyMSwiZXhwIjoxNTk0OTExNzIxfQ.9m_Lock0HAI1iA33NS-uZUshTUGzGtaq9GS6SCMwfDA"
      )

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }
      // Fetch and filter data to only show reviews on corresponding page
      fetch(
        `${process.env.GATSBY_API_URL}/reviews?_sort=createdAt:DESC`,
        requestOptions
      )
        .then(response => {
          return response.json()
        })
        .then(json => {
          setFetchedReviews(
            json.filter(review => review.listingId === listingId)
          )
          setLoading(false)
        })
        .catch(error => {
          console.log("error", error)
          setLoading(false)
          setFetchedReviews(false)
          setError(true)
          return false
        })
    }
    getReviews()

    // Get all form inputs
    const reviewForm = document.getElementById("review-form")
    const name = document.getElementById("review-name")
    const email = document.getElementById("review-email")
    const propertyRating = document.getElementById("review-property-rating")
    const agentRating = document.getElementById("review-agent-rating")
    const landlordRating = document.getElementById("review-landlord-rating")
    const body = document.getElementById("review-body")

    // Hidden Inputs
    const date = document.getElementById("review-date")
    const listingIdEl = document.getElementById("listing-id")

    // Notification
    const notification = document.querySelector(".notification")

    // Handle Submit
    const submitHandler = e => {
      // Prevent default form submit
      e.preventDefault()

      // Set Headers and authorise
      const myHeaders = new Headers()
      myHeaders.append(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZThkYmMwOGVkY2JlM2U2Y2IyMjU4ZiIsImlhdCI6MTU5MjMxOTcyMSwiZXhwIjoxNTk0OTExNzIxfQ.9m_Lock0HAI1iA33NS-uZUshTUGzGtaq9GS6SCMwfDA"
      )
      myHeaders.append("Content-Type", "application/json")

      // Construct Body of request by extracting values from from fields
      const raw = JSON.stringify({
        name: name.value,
        email: email.value,
        date: date.value,
        listingId: listingIdEl.value,
        propertyRating: propertyRating.value,
        agentRating: agentRating.value,
        landlordRating: landlordRating.value,
        reviewBody: body.value,
      })

      // Setup request
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      }

      // Use Fetch to post request and log results
      fetch(`${process.env.GATSBY_API_URL}/reviews`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log("error", error))

      // Set the form back to default
      name.value = ""
      email.value = ""
      propertyRating.value = "1"
      agentRating.value = "1"
      landlordRating.value = "1"
      body.value = ""
      // Update state
      setFormSubmit("form-submitted")
      setNotification("notification-open")
      // Call get reviews function again to display the newly submitted review without a page refresh
      getReviews()
    }

    // Listen for form submit
    if (reviewForm) {
      reviewForm.addEventListener("submit", submitHandler)
    }

    // Close notifiction
    const closeNotice = () => {
      notification.style.display = "none"
      setNotification("notification-closed")
    }

    // Listen for click on notification
    if (notification) {
      notification.addEventListener("click", closeNotice)
    }

    // Close thank you notice after 5 seconds
    const closeTimeOut = () => {
      const notice = document.querySelector(".notification.notification-open")
      if (notice) {
        setTimeout(() => {
          notice.style.display = "none"
        }, 5000)
        setNotification("notification-closed")
      }
    }
    closeTimeOut()

    // Clean up by removing eventlistener
    return () => {
      if (reviewForm && notification) {
        reviewForm.removeEventListener("submit", submitHandler)
        notification.removeEventListener("click", closeNotice)
      }
    }
  }, [formSubmit, listingId, location.state])

  // Declare vars
  let imageUrl
  let imageCaption
  let shortDescription
  let displayableAddress
  let agentLogo
  let agentName
  let numBedrooms
  let propertyType
  // Check and set vars based on user's journey either from /results or direct
  if (location.state !== null) {
    imageUrl = location.state.imageUrl
    imageCaption = location.state.imageCaption
    numBedrooms = location.state.numBedrooms
    propertyType = location.state.propertyType
    shortDescription = location.state.shortDescription
    displayableAddress = location.state.displayableAddress
    agentLogo = location.state.agentLogo
    agentName = location.state.agentName
  } else if (location.state === null && fetchedProperty) {
    imageUrl = fetchedProperty[0].image_645_430_url
    imageCaption = fetchedProperty[0].image_caption
    numBedrooms = fetchedProperty[0].num_bedrooms
    propertyType = fetchedProperty[0].property_type
    shortDescription = fetchedProperty[0].short_description
    displayableAddress = fetchedProperty[0].displayable_address
    agentLogo = fetchedProperty[0].agent_logo
    agentName = fetchedProperty[0].agent_name
  }

  // Get average rating from all reviews
  const reviewAverageTotal = () => {
    if (fetchedReviews) {
      let reviewAverage = 0
      let averageTotal = 0
      let index = 0
      for (const key in fetchedReviews) {
        if (fetchedReviews.hasOwnProperty(key)) {
          index++
          const review = fetchedReviews[key]
          reviewAverage +=
            (review.agentRating +
              review.landlordRating +
              review.propertyRating) /
            3
        }
        averageTotal = reviewAverage / index
      }
      averageTotal = Math.round(averageTotal)
      return averageTotal
    }
  }

  return (
    <Layout location={location}>
      <Head title="Property" />
      <section>
        <div className="container">
          {error === true ? (
            <div>
              <h1 className="title is-1">Property not found</h1>
              <p>
                There was an error loading this property. Please check the
                listing id carefully and try again
              </p>
            </div>
          ) : (
            <div>
              <HeadingOne
                pageTitle={`${numBedrooms} bedroom ${propertyType}`}
              />
              <div className="columns">
                <div className="column is-two-thirds">
                  <figure>
                    <img src={imageUrl} alt="" />
                    <figcaption>{imageCaption}</figcaption>
                  </figure>
                  <p>{shortDescription}</p>
                  <p>{displayableAddress}</p>
                </div>
                <div className="columns is-one-third">
                  <div>
                    <img src={agentLogo} alt="" />
                    <h6 className="title is-6">{agentName}</h6>
                    <h6 className="title is-6">Property average rating</h6>
                    <StarRating count={reviewAverageTotal()} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      {!error && (
        <section className="reviews">
          <div className="container">
            <div className={`notification is-success ${notification}`}>
              <button className="delete"></button>
              <h4 className="title is-4">Your review has been submitted</h4>
              <p>Thank you for submitting a review for this property.</p>
              <p>Your review will appear soon.</p>
            </div>
            <h2 className="title is-2 has-text-centered">Lived here?</h2>
            <h3 className="title -is-3 has-text-centered">
              Help others by leaving a review
            </h3>
            <div className="columns is-centered">
              <div className="column is-two-thirds">
                <div className="review-wrap">
                  <ReviewForm listingId={listingId} />
                  <h2 className="title is-2 has-text-centered">
                    What the community says
                  </h2>
                  {loading && <p>Loading reviews...</p>}
                  {error && (
                    <p>
                      There was an error fetching the reviews, please try again
                      later
                    </p>
                  )}
                  {fetchedReviews &&
                    Object.keys(fetchedReviews).map((index, key) => (
                      <Review key={index} review={fetchedReviews[key]} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  )
}

export default Property
