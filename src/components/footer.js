import React from "react"
import "./footer.scss"

const Footer = () => (
  <footer>
    <div className="container">
      <div className="row justify-content-between align-items-center py-5">
        <div className="col-auto mx-auto py-1">
          <span>maksymilian.org &copy; {new Date().getFullYear()} &sdot; </span>
          <a
            target="_blank"
            href="https://www.freepik.com/free-photos-vectors/business"
            rel="noreferrer"
          >
            Business vector created by freepik - www.freepik.com
          </a>
        </div>
        <div className="col-auto mx-auto py-1 icons ">
          <div className="row justify-content-center ">
            <div className="col-auto">
              <a
                href="https://m.me/maksymilian.org"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-facebook-messenger"></i>
              </a>
            </div>
            <div className="col-auto">
              <a
                href="https://www.facebook.com/maksymilian.org"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-facebook-square"></i>
              </a>
            </div>
            <div className="col-auto">
              <a
                href="https://www.linkedin.com/in/maksymilian-furtak-621b13133/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
            <div className="col-auto">
              <a
                href="skype:maksymilian.org?call"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-skype"></i>
              </a>
            </div>
            <div className="col-auto">
              <a
                href="mailto:kontakt@maksymilian.org"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fas fa-envelope-square"></i>
              </a>
            </div>
            <div className="col-auto">
              <a href="callto://+48785120693" target="_blank" rel="noreferrer">
                <i className="fas fa-phone-square-alt"></i>
              </a>
            </div>
            <div className="col-auto">
              <a
                href="https://github.com/maksymilian-org"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
