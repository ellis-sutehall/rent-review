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

  return (
    <div className="leave-review">
      <form id="review-form">
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
