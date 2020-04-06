import React from "react"
import Layout from "../components/layout"
import Head from "../components/head"
import PageHero from "../components/pageHero"

const aboutPage = ({ location }) => (
  <Layout location={location}>
    <Head title="About" />
    <PageHero />
    <section>
      <div className="container">
        <h2 className="title is-2">Second Section</h2>
        <p>More detail about site here</p>
        <p>Maybe some images or icons would be nice?</p>
      </div>
    </section>
  </Layout>
)

export default aboutPage
