import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          tagline
          footer {
            footer_menu {
              actions {
                label
                url
              }
            }
          }
        }
      }
    }
  `)
  return (
    <footer className="footer">
      <div className="container">
        <div className="level">
          <div className="level-left has-text-centered-mobile">
            <div className="level-item">
              <h5 className="title is-5">{data.site.siteMetadata.title}</h5>
            </div>
            <div className="level-item">
              <h6 className="title is-6">{data.site.siteMetadata.tagline}</h6>
            </div>
          </div>
          <div className="level-right has-text-centered-mobile">
            <div className="level-item">
              <nav className="navbar">
                {data.site.siteMetadata.footer.footer_menu.actions.map(
                  (action, index) => (
                    <Link key={index} className="navbar-item" to={action.url}>
                      {action.label}
                    </Link>
                  )
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
