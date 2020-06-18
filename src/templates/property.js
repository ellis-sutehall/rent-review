import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Head from "../components/head"
import HeadingOne from "../components/headingOne"
import Review from "../components/review"
import ReviewForm from "../components/reviewForm"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons"
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons"

export const propertyQuery = graphql`
  query($slug: String!) {
    property(listing_id: { eq: $slug }) {
      description
      displayable_address
      short_description
      image_url
      image_caption
      agent_logo
      agent_name
      listing_id
    }
  }
`

const Property = ({ props, location, data }) => {
  const [fetchedReviews, setFetchedReviews] = useState([])
  const [formSubmit, setFormSubmit] = useState("form-not-submitted")
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")

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
            json.filter(review => review.listingId === data.property.listing_id)
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
    const listingId = document.getElementById("listing-id")

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
        listingId: listingId.value,
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
      // Call get reviews function again to display the newly submitted review without a page refresh
      getReviews()
    }

    // Listen for form submit
    reviewForm.addEventListener("submit", submitHandler)
    // Clean up by removing eventlistener
    return () => {
      reviewForm.removeEventListener("submit", submitHandler)
    }
  }, [formSubmit, data.property.listing_id])
  // Close thank you notice on click
  const closeNotice = () => {
    const notice = document.querySelector(".notification.form-submitted")
    notice.style.display = "none"
  }
  const closeTimeOut = () => {
    const notice = document.querySelector(".notification.form-submitted")
    if (notice) {
      setTimeout(() => {
        notice.style.display = "none"
      }, 5000)
    }
  }

  closeTimeOut()

  return (
    <Layout location={location}>
      <Head title="Property" />
      <section>
        <div className="container">
          <HeadingOne pageTitle="Property H1 Title Thingy" />
          <div className="columns">
            <div className="column is-two-thirds">
              <figure>
                <img src={data.property.image_url} alt="" />
                <figcaption>{data.property.image_caption}</figcaption>
              </figure>
              <p>{data.property.short_description}</p>
              <p>{data.property.displayable_address}</p>
            </div>
            {/* Sidebar */}
            <div className="columns is-one-third">
              <div>
                <img src={data.property.agent_logo} alt="" />
                <h6 className="title is-6">{data.property.agent_name}</h6>
                <span className="icon">
                  <FontAwesomeIcon icon={fasStar} />
                </span>
                <span className="icon">
                  <FontAwesomeIcon icon={fasStar} />
                </span>
                <span className="icon">
                  <FontAwesomeIcon icon={fasStar} />
                </span>
                <span className="icon">
                  <FontAwesomeIcon icon={fasStar} />
                </span>
                <span className="icon">
                  <FontAwesomeIcon icon={farStar} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="reviews">
        <div className="container">
          <div
            className={`notification is-success ${formSubmit}`}
            data={formSubmit}
          >
            <button className="delete" onClick={closeNotice}></button>
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
                <ReviewForm listingId={data.property.listing_id} />
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
    </Layout>
  )
}

export default Property
