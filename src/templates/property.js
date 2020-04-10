import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Head from "../components/head"
import HeadingOne from "../components/headingOne"
import Reviews from "../components/reviews"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons"
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons"

const Property = (props, location) => {
  return (
    <Layout location={location}>
      <Head title="Property" />
      <section>
        <div className="container">
          <HeadingOne pageTitle="Property H1 Title Thingy" />
          <div className="columns">
            <div className="column is-two-thirds">
              <figure>
                <img src={props.data.property.image_url} alt="" />
                <figcaption>{props.data.property.image_caption}</figcaption>
              </figure>
              <p>{props.data.property.short_description}</p>
              <p>{props.data.property.displayable_address}</p>
            </div>
            {/* Sidebar */}
            <div className="columns is-one-third">
              <div>
                <img src={props.data.property.agent_logo} alt="" />
                <h6 className="title is-6">{props.data.property.agent_name}</h6>
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
      <div>
        {props.data.allReviewsYaml.edges.map((edge) => (
          <p>
            {edge.node.name} - {edge.node.review}
          </p>
        ))}
      </div>
      <Reviews listingId={props.data.property.listing_id} />
    </Layout>
  )
}

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

export default Property
