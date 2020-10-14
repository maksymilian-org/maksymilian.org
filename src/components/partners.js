import React from "react"
import "./partners.scss"
import hotelmlyn from "../images/hotel-mlyn.png"
import vacansoleil from "../images/vacansoleil.png"
import hepatica from "../images/hepatica.png"
import metaloplastyka from "../images/barossa-metaloplastyka.png"
import asbud from "../images/asbud.png"
import ckpartners from "../images/ckpartners.png"
import misspolski from "../images/miss-polski.png"
import hotelroyalbotanic from "../images/hotel-royal-botanic.png"

const Partners = () => (
  <div className="purple partners pad-ver">
    <div className="container">
      <div className="row middle-md center-md">
        <div className="col-xs-3">
          <img src={hotelmlyn} />
        </div>
        <div className="col-xs-3">
          <img src={vacansoleil} />
        </div>
        <div className="col-xs-3">
          <img src={hepatica} />
        </div>
        <div className="col-xs-3">
          <img src={metaloplastyka} />
        </div>
        <div className="col-xs-3">
          <img src={asbud} />
        </div>
        <div className="col-xs-3">
          <img src={ckpartners} />
        </div>
        <div className="col-xs-3">
          <img src={misspolski} />
        </div>
        <div className="col-xs-3">
          <img src={hotelroyalbotanic} />
        </div>
      </div>
    </div>
  </div>
)

export default Partners
