import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Head from "../components/head"
import PageHero from "../components/pageHero"
import ReactMarkdown from "react-markdown"

export const data = graphql`
  query {
    strapiAbout {
      title
      body
    }
  }
`

const aboutPage = ({ location, data }) => {
  const about = data.strapiAbout
  return (
    <Layout location={location}>
      <Head title={about.title} />
      <PageHero />
      <section>
        <div className="container">
          <div className="content">
            <ReactMarkdown source={about.body} />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default aboutPage
