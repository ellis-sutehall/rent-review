import React from "react"
// import Header from "./header"
import Footer from "./footer"
import "../styles/app.scss"
import HomeHeroHead from "./homeHeroHead"

const Layout = ({ children, location }) => {
  // console.log(location.pathname)

  const path = location.pathname

  return (
    <div className="wrapper">
      {path !== "/" && <HomeHeroHead />}
      <main className="main">{children}</main>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
