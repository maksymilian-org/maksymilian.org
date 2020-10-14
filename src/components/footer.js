import React from "react"
import "./footer.scss"

const Footer = () => (
  <footer>
    <div className="container flex">
      <div>
        <span>maksymilian.org &copy; {new Date().getFullYear()} &sdot; </span>
        <a
          target="_blank"
          href="https://www.freepik.com/free-photos-vectors/business"
        >
          Business vector created by freepik - www.freepik.com
        </a>
      </div>
      <div>
        <div className="icons">
          <a href="https://m.me/maksymilian.org" target="_blank">
            <i className="fab fa-facebook-messenger"></i>
          </a>
          <a href="https://www.facebook.com/maksymilian.org" target="_blank">
            <i className="fab fa-facebook-square"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/maksymilian-furtak-621b13133/"
            target="_blank"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="skype:maksymilian.org?call" target="_blank">
            <i className="fab fa-skype"></i>
          </a>
          <a href="mailto:kontakt@maksymilian.org" target="_blank">
            <i className="fas fa-envelope-square"></i>
          </a>
          <a href="callto://+48785120693" target="_blank">
            <i className="fas fa-phone-square-alt"></i>
          </a>
          <a href="https://github.com/maksymilian-org" target="_blank">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
