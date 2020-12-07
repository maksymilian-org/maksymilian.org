import PropTypes from "prop-types"
import React, { useContext } from "react"
import "./header.scss"
import logo from "../images/logo.png"
import { LanguageContext } from "./layout"
import Tr from "./tr"

const Header = ({ siteTitle, theme, toggleTheme }) => {
  const { language, toggleLanguage } = useContext(LanguageContext)

  return (
    <header className="header mb-4">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-12 col-sm-6">
            <div className="logo py-4">
              <img src={logo} alt="maksymilian.org's logo" />
            </div>
          </div>
          <nav className="col-12 col-sm-6">
            <div className="row justify-content-end mx-auto">
              <div
                className="switch"
                onClick={toggleLanguage}
                onKeyPress={toggleTheme}
                role="button"
                tabIndex="0"
              >
                <span className={language === "en-US" ? "active" : ""}>en</span>
                <span className={language === "pl-PL" ? "active" : ""}>pl</span>
              </div>
              <div
                className="switch"
                onClick={toggleTheme}
                onKeyPress={toggleTheme}
                role="button"
                tabIndex="-1"
              >
                <span className={theme === "light" ? "active" : ""}>
                  <Tr en="light" pl="jasny" />
                </span>
                <span className={theme === "dark" ? "active" : ""}>
                  <Tr en="dark" pl="ciemny" />
                </span>
              </div>
            </div>
          </nav>
        </div>
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
