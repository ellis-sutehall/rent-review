import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons"
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons"

const StarRating = props => {
  const createStars = () => {
    let starWrap = []
    for (let i = 0; i < 5; i++) {
      let stars = []
      if (i < props.count) {
        stars.push(<FontAwesomeIcon icon={fasStar} />)
      } else {
        stars.push(<FontAwesomeIcon icon={farStar} />)
      }
      starWrap.push(stars)
    }
    return starWrap
  }
  return <div>{createStars()}</div>
}

export default StarRating
