import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

const HomeHeroHead = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          header {
            left_menu {
              actions {
                label
                url
              }
            }
            right_menu {
              actions {
                label
                url
                class
              }
            }
          }
        }
      }
    }
  `)

  return (
    <div className="hero-head">
      <header
        className="navbar is-transparent is-fixed-top"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <div className="navbar-item">
              <p>
                <strong>Logo</strong>
              </p>
            </div>
            <button
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </button>
          </div>

          <div className="navbar-menu">
            <div className="navbar-start">
              {data.site.siteMetadata.header.left_menu.actions.map(
                (action, index) => (
                  <Link key={index} className="navbar-item" to={action.url}>
                    {action.label}
                  </Link>
                )
              )}
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                {data.site.siteMetadata.header.right_menu.actions.map(
                  (action, index) => (
                    <Link key={index} className={action.class} to={action.url}>
                      {action.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default HomeHeroHead
