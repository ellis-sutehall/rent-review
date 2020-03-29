import React from "react"
import Header from "./header"
import Footer from "./footer"
import "../styles/app.scss"

const Layout = ({ children, location }) => {
  console.log(location.pathname)

  // function checkPath() {
  const path = location.pathname
  let home = ""
  if (path === "/") {
    home = false
  } else {
    home = true
  }
  // }

  return (
    <div className="wrapper">
      {home && <Header />}
      <main className="main">{children}</main>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
