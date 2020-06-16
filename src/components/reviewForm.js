import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUser,
  faCheck,
  faEnvelope,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons"

const Reviewform = props => {
  let date = new Date().toISOString().substr(0, 19)

  const submitHandler = e => {
    // Prevent default form submit
    e.preventDefault()

    // Get all form inputs
    const name = document.getElementById("review-name")
    const email = document.getElementById("review-email")
    const propertyRating = document.getElementById("review-property-rating")
    const agentRating = document.getElementById("review-agent-rating")
    const landlordRating = document.getElementById("review-landlord-rating")
    const body = document.getElementById("review-body")

    // Hidden Inputs
    const date = document.getElementById("review-date")
    const listingId = document.getElementById("listing-id")

    // Set Headers
    const myHeaders = new Headers()
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
    fetch("http://localhost:1337/reviews", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log("error", error))

    // Finally, clear form and set state
    name.value = ""
    email.value = ""
    propertyRating.value = ""
    agentRating.value = ""
    landlordRating.value = ""
    body.value = ""
  }

  return (
    <div className="leave-review">
      <form onSubmit={submitHandler}>
        <div className="columns">
          <div className="column is-half">
            <div>
              <input
                id="listing-id"
                name="listing_id"
                type="hidden"
                value={props.listingId}
                required
              />
              <input
                id="review-date"
                name="date"
                type="hidden"
                value={date}
                required
              />
            </div>
            <div className="field">
              <label className="label" htmlFor="name">
                Name
              </label>
              <div className="control has-icons-left has-icons-right">
                <input
                  id="review-name"
                  className="input"
                  type="text"
                  name="name"
                  required
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <span className="icon is-small is-right">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              </div>
              <p className="help">
                Enter your name as it will display on the site
              </p>
            </div>
          </div>
          <div className="column is-half">
            <div className="field">
              <label className="label" htmlFor="email">
                Email
              </label>
              <div className="control has-icons-left has-icons-right">
                <input
                  id="review-email"
                  className="input"
                  type="text"
                  name="email"
                  required
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <span className="icon is-small is-right">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                </span>
              </div>
              <p className="help">Enter a valid email address</p>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-one-third has-text-centered">
            <h6 className="title is-6">How would you rate the property?</h6>
            <div className="control has-text-centered">
              <div className="select">
                <select
                  id="review-property-rating"
                  name="property-rating"
                  required
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
            </div>
          </div>
          <div className="column is-one-third has-text-centered">
            <h6 className="title is-6">How would you rate the agent?</h6>
            <div className="control has-text-centered">
              <div className="select">
                <select id="review-agent-rating" name="agent-rating" required>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
            </div>
          </div>
          <div className="column is-one-third has-text-centered">
            <h6 className="title is-6">How would you rate the landlord?</h6>
            <div className="control has-text-centered">
              <div className="select">
                <select
                  id="review-landlord-rating"
                  name="landlord-rating"
                  required
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="review">
            Review
          </label>
          <textarea
            id="review-body"
            className="textarea"
            type="text"
            name="review-body"
            placeholder="Leave your review here"
            rows="8"
            required
          ></textarea>
        </div>

        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Reviewform
