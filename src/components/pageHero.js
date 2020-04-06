import React from "react"
import HeadingOne from "../components/headingOne"
import PageIntro from "./pageIntro"

const PageHero = () => {
  return (
    <section className="hero-half">
      <div className="container">
        <HeadingOne pageTitle="About Page" />
        <PageIntro intro="This is the about page" />
      </div>
    </section>
  )
}

export default PageHero
