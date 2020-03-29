import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
// import headerStyles from "./header.module.scss"

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          tagline
        }
      }
    }
  `)
  return (
    <header>
      <div className="">
        <div className="">
          <h3>
            <Link to="/">{data.site.siteMetadata.title}</Link>
          </h3>
          <span>{data.site.siteMetadata.tagline}</span>
        </div>
        <div className="">
          <nav>
            <ul className="menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/results">Results</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
