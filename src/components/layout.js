import React, { useState, createContext } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { createGlobalStyle } from "styled-components"

import Header from "./header"
import "normalize.css"
import "bootstrap/dist/css/bootstrap-grid.css"
import "@fortawesome/fontawesome-free/css/all.css"
import "@mdi/font/css/materialdesignicons.min.css"
import "./layout.scss"
import Footer from "./footer"

const GlobalStyle = createGlobalStyle`
  :root {
    --accent: ${props => (props.theme === "light" ? "#512DA8;" : "#a58cff")};
    --accentlight: ${props =>
      props.theme === "light" ? "#f8f7fc" : "#3d227f"};
    --background: ${props => (props.theme === "light" ? "#fff" : "#512DA8")};
    --color: ${props => (props.theme === "light" ? "#404040" : "#fff")};
    --colorinvert: ${props => (props.theme === "light" ? "#fff;" : "#404040")};
    --grey: ${props => (props.theme === "light" ? "#757575;" : "#f5f5f5")};
    --brightness: ${props => (props.theme === "light" ? "none" : "10")};
    --greylight: #aaa;
  }
`

export const LanguageContext = createContext()

const Layout = ({ children }) => {
  const [language, setLanguage] = useState(
    navigator.language === "pl" || navigator.language === "pl-PL"
      ? "pl-PL"
      : "en-US"
  )
  const [theme, setTheme] = useState("light")

  const handleToogleLanguage = () => {
    setLanguage(prevLanguage => (prevLanguage === "en-US" ? "pl-PL" : "en-US"))
  }

  const handleToogleTheme = () => {
    setTheme(prevTheme => (prevTheme === "dark" ? "light" : "dark"))
  }

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage: handleToogleLanguage }}
    >
      <GlobalStyle theme={theme} />
      <Header
        siteTitle={data.site.siteMetadata.title}
        theme={theme}
        toggleTheme={handleToogleTheme}
      />
      <main>{children}</main>
      <Footer />
    </LanguageContext.Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
