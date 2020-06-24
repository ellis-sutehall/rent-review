import React from "react"
import Head from "../components/head"
import Layout from "../components/layout"
import HomeHeroHead from "../components/homeHeroHead"
import HomeHeroBody from "../components/homeHeroBody"
import HomeHeroFooter from "../components/homeHeroFooter"
import HomeSecondary from "../components/homeSecondary"

const IndexPage = ({ location }) => {
  return (
    <Layout location={location}>
      <Head title="Home" />

      <section className="hero is-fullheight">
        <HomeHeroHead />
        <HomeHeroBody />
        <HomeHeroFooter />
      </section>

      <HomeSecondary />
    </Layout>
  )
}

export default IndexPage
