import React from "react"
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
    allReviewsYaml(
      filter: { fields: { slug: { eq: $slug } } }
      sort: { fields: date, order: DESC }
    ) {
      edges {
        node {
          name
          review
          agent_rating
          landlord_rating
          property_rating
          listing_id
        }
      }
    }
  }
`

const Property = ({ props, location, data }) => {
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
                {data.allReviewsYaml.edges.map(({ node }) => {
                  return <Review review={node} />
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Property
