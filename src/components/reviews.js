import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import ReviewForm from "./reviewForm"
import StarRating from "./starRating"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons"
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons"

const Reviews = props => {
  const reviewData = useStaticQuery(graphql`
    query {
      allReviewsYaml {
        edges {
          node {
            name
            date
            email
            review
            property_rating
            agent_rating
            landlord_rating
          }
        }
      }
    }
  `)

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
              <ReviewForm />
              <h2 className="title is-2 has-text-centered">
                What the community says
              </h2>
              {reviewData.allReviewsYaml.edges.map(edge => (
                <div className="review">
                  <div className="star-rating">
                    <div className="level">
                      <div className="property-rating">
                        <p>
                          <strong>Property</strong>
                        </p>
                        <StarRating count={edge.node.property_rating} />
                      </div>
                      <div className="agent-rating">
                        <p>
                          <strong>Agent</strong>
                        </p>
                        <StarRating count={edge.node.agent_rating} />
                      </div>
                      <div className="landlord-rating">
                        <p>
                          <strong>Landlord</strong>
                        </p>
                        <StarRating count={edge.node.landlord_rating} />
                      </div>
                      <div className="aggregate-rating">
                        <p>
                          <strong>Overall</strong>
                        </p>
                        <StarRating
                          count={Math.round(
                            (parseInt(edge.node.property_rating) +
                              parseInt(edge.node.agent_rating) +
                              parseInt(edge.node.landlord_rating)) /
                              3
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <p>{edge.node.review}</p>
                  <p className="reviewer">
                    <strong>- {edge.node.name}</strong>
                  </p>
                </div>
              ))}
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
