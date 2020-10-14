import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Start from "../components/start"
import Partners from "../components/partners"
import About from "../components/about"
import Portfolio from "../components/portfolio"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Maksymilian" />
      <Start />
      <Partners />
      <Portfolio />
      <About />
    </Layout>
  )
}

export default IndexPage
