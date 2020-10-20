import React from "react"
import "./start.scss"
import mainImg from "../images/code.svg"
import Tr from "./tr"

const Start = () => (
  <div className="container">
    <div className="row align-items-center py-5">
      <div className="start-text col-12 col-md-6">
        <h1>
          <Tr>I'm|Jestem</Tr>{" "}
          <span>
            <Tr>Max|Maksymilian</Tr>
          </span>
        </h1>
        <h2>
          <Tr>and I would to write some|i chciałbym napisać trochę</Tr>{" "}
          <span>
            <Tr>JS code|JavaScriptu</Tr>
          </span>{" "}
          <Tr>for you|dla Ciebie</Tr>.
        </h2>
        <p>
          <Tr>
            Want to know more about my|Chcesz dowiedzieć się więcej o moim
          </Tr>{" "}
          <span>
            <Tr>frontend life|frontendowym życiu</Tr>
          </span>
          ? <Tr>Scroll down|Przewiń w dół</Tr>!
        </p>
      </div>
      <div className="start-picture col-12 col-md-6">
        <img src={mainImg} alt="code" />
      </div>
    </div>
  </div>
)

export default Start
