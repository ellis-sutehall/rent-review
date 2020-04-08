import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUser,
  faCheck,
  faEnvelope,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons"

const Reviewform = props => (
  <div className="leave-review">
    <form
      method="POST"
      action="https://api.staticman.net/v3/entry/github/ellis-sutehall/rent-review/master/reviews"
    >
      <div className="columns">
        <div className="column is-half">
          <div>
            <input
              name="options[redirect]"
              type="hidden"
              value="http://localhost:8000"
            />
          </div>
          <div>
            <input
              name="fields[listing_id]"
              type="hidden"
              value={props.listingId}
            />
          </div>
          <div>
            <input name="options[slug]" type="hidden" value={props.listingId} />
          </div>
          <div className="field">
            <label className="label" htmlFor="name">
              Name
            </label>
            <div className="control has-icons-left has-icons-right">
              <input className="input" type="text" name="fields[name]" />
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
              <input className="input" type="text" name="fields[email]" />
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
            <label className="radio">
              <input type="radio" name="fields[property-rating]" value="1" />1
            </label>
            <label className="radio">
              <input type="radio" name="fields[property-rating]" value="2" />2
            </label>
            <label className="radio">
              <input type="radio" name="fields[property-rating]" value="3" />3
            </label>
            <label className="radio">
              <input type="radio" name="fields[property-rating]" value="4" />4
            </label>
            <label className="radio">
              <input type="radio" name="fields[property-rating]" value="5" />5
            </label>
          </div>
        </div>
        <div className="column is-one-third has-text-centered">
          <h6 className="title is-6">How would you rate the agent?</h6>
          <div className="control has-text-centered">
            <label className="radio">
              <input type="radio" name="fields[agent-rating]" value="1" />1
            </label>
            <label className="radio">
              <input type="radio" name="fields[agent-rating]" value="2" />2
            </label>
            <label className="radio">
              <input type="radio" name="fields[agent-rating]" value="3" />3
            </label>
            <label className="radio">
              <input type="radio" name="fields[agent-rating]" value="4" />4
            </label>
            <label className="radio">
              <input type="radio" name="fields[agent-rating]" value="5" />5
            </label>
          </div>
        </div>
        <div className="column is-one-third has-text-centered">
          <h6 className="title is-6">How would you rate the landlord?</h6>
          <div className="control has-text-centered">
            <label className="radio">
              <input type="radio" name="fields[landlord-rating]" value="1" />1
            </label>
            <label className="radio">
              <input type="radio" name="fields[landlord-rating]" value="2" />2
            </label>
            <label className="radio">
              <input type="radio" name="fields[landlord-rating]" value="3" />3
            </label>
            <label className="radio">
              <input type="radio" name="fields[landlord-rating]" value="4" />4
            </label>
            <label className="radio">
              <input type="radio" name="fields[landlord-rating]" value="5" />5
            </label>
          </div>
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="review">
          Review
        </label>
        <textarea
          className="textarea"
          type="text"
          name="fields[review]"
          id=""
          placeholder="Leave your review here"
          rows="8"
        ></textarea>
      </div>

      <button className="button" type="submit">
        Submit
      </button>
    </form>
  </div>
)

export default Reviewform
