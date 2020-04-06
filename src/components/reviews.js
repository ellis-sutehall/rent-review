import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faStar as fasStar,
  faUser,
  faCheck,
  faEnvelope,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons"
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons"

const Reviews = () => {
  return (
    <section className="reviews">
      <div className="container">
        <h2 className="title is-2 has-text-centered">Lived here?</h2>
        <h3 className="title -is-3 has-text-centered">
          Help others by leaving a review
        </h3>
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <div className="review-wrap">
              <div className="leave-review">
                <form
                  method="POST"
                  action="https://api.staticman.net/v3/entry/github/ellis-sutehall/rent-review/master/comments"
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
                      <div className="field">
                        <label className="label" htmlFor="name">
                          Name
                        </label>
                        <div className="control has-icons-left has-icons-right">
                          <input
                            className="input"
                            type="text"
                            name="fields[name]"
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
                            className="input"
                            type="text"
                            name="fields[email]"
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
                  {/* <div className="columns">
                    <div className="column is-one-third has-text-centered">
                      <h6 className="title is-6">
                        How would you rate the property?
                      </h6>
                      <div className="control has-text-centered">
                        <label className="radio">
                          <input type="radio" name="one" />1
                        </label>
                        <label className="radio">
                          <input type="radio" name="two" />2
                        </label>
                        <label className="radio">
                          <input type="radio" name="three" />3
                        </label>
                        <label className="radio">
                          <input type="radio" name="four" />4
                        </label>
                        <label className="radio">
                          <input type="radio" name="five" />5
                        </label>
                      </div>
                    </div>
                    <div className="column is-one-third has-text-centered">
                      <h6 className="title is-6">
                        How would you rate the agent?
                      </h6>
                      <div className="control has-text-centered">
                        <label className="radio">
                          <input type="radio" name="one" />1
                        </label>
                        <label className="radio">
                          <input type="radio" name="two" />2
                        </label>
                        <label className="radio">
                          <input type="radio" name="three" />3
                        </label>
                        <label className="radio">
                          <input type="radio" name="four" />4
                        </label>
                        <label className="radio">
                          <input type="radio" name="five" />5
                        </label>
                      </div>
                    </div>
                    <div className="column is-one-third has-text-centered">
                      <h6 className="title is-6">
                        How would you rate the landlord?
                      </h6>
                      <div className="control has-text-centered">
                        <label className="radio">
                          <input type="radio" name="one" />1
                        </label>
                        <label className="radio">
                          <input type="radio" name="two" />2
                        </label>
                        <label className="radio">
                          <input type="radio" name="three" />3
                        </label>
                        <label className="radio">
                          <input type="radio" name="four" />4
                        </label>
                        <label className="radio">
                          <input type="radio" name="five" />5
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
                      name="review"
                      id=""
                      placeholder="Leave your review here"
                      rows="8"
                    ></textarea>
                  </div> */}

                  <button className="button" type="submit">
                    Submit
                  </button>
                </form>
              </div>
              <h2 className="title is-2 has-text-centered">
                What the community says
              </h2>
              <div className="review">
                <div className="star-rating">
                  <div className="level">
                    <div className="property-rating">
                      <p>
                        <strong>Property</strong>
                      </p>
                      <FontAwesomeIcon icon={fasStar} />
                      <FontAwesomeIcon icon={fasStar} />
                      <FontAwesomeIcon icon={fasStar} />
                      <FontAwesomeIcon icon={farStar} />
                      <FontAwesomeIcon icon={farStar} />
                    </div>
                    <div className="agent-rating">
                      <p>
                        <strong>Agent</strong>
                      </p>
                      <FontAwesomeIcon icon={fasStar} />
                      <FontAwesomeIcon icon={fasStar} />
                      <FontAwesomeIcon icon={fasStar} />
                      <FontAwesomeIcon icon={farStar} />
                      <FontAwesomeIcon icon={farStar} />
                    </div>
                    <div className="landlord-rating">
                      <p>
                        <strong>Landlord</strong>
                      </p>
                      <FontAwesomeIcon icon={fasStar} />
                      <FontAwesomeIcon icon={fasStar} />
                      <FontAwesomeIcon icon={fasStar} />
                      <FontAwesomeIcon icon={farStar} />
                      <FontAwesomeIcon icon={farStar} />
                    </div>
                    <div className="aggregate-rating">
                      <p>
                        <strong>Overall</strong>
                      </p>
                      <FontAwesomeIcon icon={fasStar} />
                      <FontAwesomeIcon icon={fasStar} />
                      <FontAwesomeIcon icon={fasStar} />
                      <FontAwesomeIcon icon={farStar} />
                      <FontAwesomeIcon icon={farStar} />
                    </div>
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque nec vestibulum massa, at tristique turpis. Nulla leo
                  est, porta sit amet velit ut, pretium accumsan elit. Praesent
                  pulvinar nisi viverra augue mattis, ac imperdiet justo porta.
                  Quisque felis erat, porta at risus cursus, placerat semper
                  dui. Nullam luctus neque vitae leo ornare, a dapibus nunc
                  sagittis. Suspendisse rutrum metus vitae facilisis fringilla.
                  Duis iaculis magna enim, ac tincidunt ligula facilisis eu.
                  Nullam aliquet cursus lorem eget viverra.
                </p>
                <p className="reviewer">
                  <strong>- Dele Makinde</strong>
                </p>
              </div>
              <div className="review">
                <div className="star-rating">
                  <div className="level">
                    <div className="property-rating">
                      <p>
                        <strong>Property</strong>
                      </p>
                      <FontAwesomeIcon icon={fasStar} />
                      <FontAwesomeIcon icon={fasStar} />
                      <FontAwesomeIcon icon={fasStar} />
                      <FontAwesomeIcon icon={farStar} />
                      <FontAwesomeIcon icon={farStar} />
                    </div>
                    <div className="agent-rating">
                      <p>
                        <strong>Agent</strong>
                      </p>
                      <FontAwesomeIcon icon={fasStar} />
                      <FontAwesomeIcon icon={fasStar} />
                      <FontAwesomeIcon icon={fasStar} />
                      <FontAwesomeIcon icon={farStar} />
                      <FontAwesomeIcon icon={farStar} />
                    </div>
                    <div className="landlord-rating">
                      <p>
                        <strong>Landlord</strong>
                      </p>
                      <FontAwesomeIcon icon={fasStar} />
                      <FontAwesomeIcon icon={fasStar} />
                      <FontAwesomeIcon icon={fasStar} />
                      <FontAwesomeIcon icon={farStar} />
                      <FontAwesomeIcon icon={farStar} />
                    </div>
                    <div className="aggregate-rating">
                      <p>
                        <strong>Overall</strong>
                      </p>
                      <FontAwesomeIcon icon={fasStar} />
                      <FontAwesomeIcon icon={fasStar} />
                      <FontAwesomeIcon icon={fasStar} />
                      <FontAwesomeIcon icon={farStar} />
                      <FontAwesomeIcon icon={farStar} />
                    </div>
                  </div>
                </div>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque nec vestibulum massa, at tristique turpis. Nulla leo
                  est, porta sit amet velit ut, pretium accumsan elit. Praesent
                  pulvinar nisi viverra augue mattis, ac imperdiet justo porta.
                  Quisque felis erat, porta at risus cursus, placerat semper
                  dui. Nullam luctus neque vitae leo ornare, a dapibus nunc
                  sagittis. Suspendisse rutrum metus vitae facilisis fringilla.
                  Duis iaculis magna enim, ac tincidunt ligula facilisis eu.
                  Nullam aliquet cursus lorem eget viverra.
                </p>
                <p className="reviewer">
                  <strong>- Ellis Sutehall</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reviews
