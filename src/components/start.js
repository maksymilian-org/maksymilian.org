import React from "react"
import "./start.scss"
import mainImg from "../images/code.svg"
import Tr from "./tr"

const Start = () => (
  <div className="container flex pad-ver">
    <div className="start-text">
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
        <Tr>Want to know more about my|Chcesz dowiedzieć się więcej o moim</Tr>{" "}
        <span>
          <Tr>frontend life|frontendowym życiu</Tr>
        </span>
        ? <Tr>Scroll down|Przewiń w dół</Tr>!
      </p>
    </div>
    <div className="start-picture">
      <img src={mainImg} />
    </div>
  </div>
)

export default Start
