import React from "react"
import StarRating from "./starRating"

const Review = props => {
  return (
    <div className="review">
      <div className="star-rating">
        <div className="level">
          <div className="property-rating">
            <p>
              <strong>Property</strong>
            </p>
            <StarRating count={props.review.property_rating} />
          </div>
          <div className="agent-rating">
            <p>
              <strong>Agent</strong>
            </p>
            <StarRating count={props.review.agent_rating} />
          </div>
          <div className="landlord-rating">
            <p>
              <strong>Landlord</strong>
            </p>
            <StarRating count={props.review.landlord_rating} />
          </div>
          <div className="aggregate-rating">
            <p>
              <strong>Overall</strong>
            </p>
            <StarRating
              count={Math.round(
                (parseInt(props.review.property_rating) +
                  parseInt(props.review.agent_rating) +
                  parseInt(props.review.landlord_rating)) /
                  3
              )}
            />
          </div>
        </div>
      </div>
      <p>{props.review.review}</p>
      <p className="reviewer">
        <strong>- {props.review.name}</strong>
      </p>
    </div>
  )
}

export default Review
