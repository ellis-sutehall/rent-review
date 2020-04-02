import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Head from "../components/head"
import HeadingOne from "../components/headingOne"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons"
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons"

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
  // setPageTitle("Property Title H1")

  return (
    <Layout location={location}>
      <Head title="Property" />
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
              <h2>I'm the sidebar</h2>
              <img src={props.data.property.agent_logo} alt="" />
              <p>{props.data.property.agent_name}</p>
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
      <section className="reviews">
        <div className="container">
          <h2 className="title is-2 has-text-centered">
            What the community says
          </h2>
          <div className="columns is-centered">
            <div className="column is-two-thirds">
              <div className="review-wrap">
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
                    est, porta sit amet velit ut, pretium accumsan elit.
                    Praesent pulvinar nisi viverra augue mattis, ac imperdiet
                    justo porta. Quisque felis erat, porta at risus cursus,
                    placerat semper dui. Nullam luctus neque vitae leo ornare, a
                    dapibus nunc sagittis. Suspendisse rutrum metus vitae
                    facilisis fringilla. Duis iaculis magna enim, ac tincidunt
                    ligula facilisis eu. Nullam aliquet cursus lorem eget
                    viverra.
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
                    est, porta sit amet velit ut, pretium accumsan elit.
                    Praesent pulvinar nisi viverra augue mattis, ac imperdiet
                    justo porta. Quisque felis erat, porta at risus cursus,
                    placerat semper dui. Nullam luctus neque vitae leo ornare, a
                    dapibus nunc sagittis. Suspendisse rutrum metus vitae
                    facilisis fringilla. Duis iaculis magna enim, ac tincidunt
                    ligula facilisis eu. Nullam aliquet cursus lorem eget
                    viverra.
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
    </Layout>
  )
}

export default Property
