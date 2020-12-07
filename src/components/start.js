import React from "react"
import "./start.scss"
import mainImg from "../images/code.svg"
import Tr from "./tr"

const Start = () => (
  <div className="container">
    <div className="row align-items-center py-5">
      <div className="start-text col-12 col-md-6">
        <h1>
          <Tr en="I'm" pl="Jestem" />{" "}
          <span>
            <Tr en="Max" pl="Maksymilian" />
          </span>
        </h1>
        <h2>
          <Tr en="and I would to write some" pl="i chciałbym napisać trochę" />{" "}
          <span>
            <Tr en="JS code" pl="JavaScriptu" />
          </span>{" "}
          <Tr en="for you" pl="dla Ciebie" />.
        </h2>
        <p>
          <Tr
            en="Want to know more about my"
            pl="Chcesz dowiedzieć się więcej o moim"
          />{" "}
          <span>
            <Tr en="frontend life" pl="frontendowym życiu" />
          </span>
          ? <Tr en="Scroll down" pl="Przewiń w dół"></Tr>!
        </p>
      </div>
      <div className="start-picture col-12 col-md-6">
        <img src={mainImg} alt="code" />
      </div>
    </div>
  </div>
)

export default Start
