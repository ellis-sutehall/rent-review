import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Head from "../components/head"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { farStar } from "@fortawesome/free-regular-svg-icons"

export const query = graphql`
  query($slug: String!) {
    property(listing_id: { eq: $slug }) {
      description
      displayable_address
      short_description
      image_url
      image_caption
      agent_logo
      agent_name
    }
  }
`

const Property = (props, location) => {
  return (
    <Layout location={location}>
      <Head title="Property" />
      <div className="container">
        <h1>Property</h1>
        <div className="columns">
          <div className="column is-two-thirds">
            <figure>
              <img src={props.data.property.image_url} alt="" />
              <figcaption>{props.data.property.image_caption}</figcaption>
            </figure>
            <p>{props.data.property.short_description}</p>
            <p>{props.data.property.displayable_address}</p>
          </div>
          <div className="columns is-one-third">
            <div>
              <h2>I'm the sidebar</h2>
              <img src={props.data.property.agent_logo} alt="" />
              <p>{props.data.property.agent_name}</p>
              <span className="icon">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="icon">
                <FontAwesomeIcon icon={farStar} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Property
