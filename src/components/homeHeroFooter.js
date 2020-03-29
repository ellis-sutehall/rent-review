import React from "react"
import { graphql, useStaticQuery } from "gatsby"

const HomeHeroFooter = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          header {
            jump_menu {
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
    <div className="hero-foot">
      <div className="container">
        <nav className="hero-footer-nav navbar">
          {data.site.siteMetadata.header.jump_menu.actions.map((action, i) => (
            <a key={i} href={action.url} className="navbar-item">
              {action.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default HomeHeroFooter
