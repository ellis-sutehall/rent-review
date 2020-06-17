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
            <StarRating count={props.review.propertyRating} />
          </div>
          <div className="agent-rating">
            <p>
              <strong>Agent</strong>
            </p>
            <StarRating count={props.review.agentRating} />
          </div>
          <div className="landlord-rating">
            <p>
              <strong>Landlord</strong>
            </p>
            <StarRating count={props.review.landlordRating} />
          </div>
          <div className="aggregate-rating">
            <p>
              <strong>Overall</strong>
            </p>
            <StarRating
              count={Math.round(
                (parseInt(props.review.propertyRating) +
                  parseInt(props.review.agentRating) +
                  parseInt(props.review.landlordRating)) /
                  3
              )}
            />
          </div>
        </div>
      </div>
      <p>{props.review.reviewBody}</p>
      <p className="reviewer">
        <strong>- {props.review.name}</strong>
        <strong>- {props.review.listingId}</strong>
      </p>
    </div>
  )
}

export default Review
