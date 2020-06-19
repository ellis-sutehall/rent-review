import React, { useState, useEffect } from "react"
import Layout from "../../components/layout"
import Head from "../../components/head"
import HeadingOne from "../../components/headingOne"
import Review from "../../components/review"
import ReviewForm from "../../components/reviewForm"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons"
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons"

const Property = ({ props, location, data }) => {
  const [fetchedReviews, setFetchedReviews] = useState([])
  const [formSubmit, setFormSubmit] = useState("form-not-submitted")
  const [notification, setNotification] = useState("")
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")

  // Problem: Navigating direct to a property listing without clicking from results page returns 404.
  // Potential Solution: On page load check if location.state.listingId is set. If not, perform fresh fetch from Zoopla using the location to extract the listing id.
  // If not valid then 404 is correct.
  // If valid then assign location.state.listingId and page should populate
  // console.log(`This is the state log: ${location.state.listingId}`)

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
            json.filter(review => review.listingId === location.state.listingId)
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
      setNotification("notification-open")
      // Call get reviews function again to display the newly submitted review without a page refresh
      getReviews()
    }

    // Listen for form submit
    reviewForm.addEventListener("submit", submitHandler)

    // Close notifiction
    const closeNotice = () => {
      notification.style.display = "none"
      setNotification("notification-closed")
    }

    // Listen for click on notification
    notification.addEventListener("click", closeNotice)
    // Close thank you notice on click

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
      reviewForm.removeEventListener("submit", submitHandler)
      notification.removeEventListener("click", closeNotice)
    }
  }, [formSubmit, location.state.listingId])

  return (
    <Layout location={location}>
      <Head title="Property" />
      <section>
        <div className="container">
          <HeadingOne pageTitle="Property H1 Title Thingy" />
          <div className="columns">
            <div className="column is-two-thirds">
              <figure>
                <img src={location.state.imageUrl} alt="" />
                <figcaption>{location.state.imageCaption}</figcaption>
              </figure>
              <p>{location.state.shortDescription}</p>
              <p>{location.state.displayableAddress}</p>
            </div>
            {/* Sidebar */}
            <div className="columns is-one-third">
              <div>
                <img src={location.state.agentLogo} alt="" />
                <h6 className="title is-6">{location.state.agentName}</h6>
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
                <ReviewForm listingId={location.state.listingId} />
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
