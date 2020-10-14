import PropTypes from "prop-types"
import React, { useContext } from "react"
import "./header.scss"
import logo from "../images/logo.png"
import { LanguageContext } from "./layout"
import Tr from "./tr"

const Header = ({ siteTitle, theme, toggleTheme }) => {
  const { language, toggleLanguage } = useContext(LanguageContext)

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="maksymilian.org's logo" />
        </div>
        <nav>
          <ul>
            <li className="switch" onClick={toggleLanguage}>
              <span className={language === "en-US" ? "active" : ""}>en</span>
              <span className={language === "pl-PL" ? "active" : ""}>pl</span>
            </li>
            <li className="switch" onClick={toggleTheme}>
              <span className={theme === "light" ? "active" : ""}>
                <Tr>light|jasny</Tr>
              </span>
              <span className={theme === "dark" ? "active" : ""}>
                <Tr>dark|ciemny</Tr>
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
