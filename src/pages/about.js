import React from "react"
import Layout from "../components/layout"
import Head from "../components/head"

const aboutPage = ({ location }) => (
  <Layout location={location}>
    <Head title="About" />
    <h1>About</h1>
    <p>This is the about page</p>
  </Layout>
)

export default aboutPage
