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
  <div className="purple partners py-5">
    <div className="container">
      <div className="row justify-items-center align-items-center">
        <div className="col-12 col-md-3 col-sm-6 py-4">
          <img src={hotelmlyn} alt="hotel mlyn" />
        </div>
        <div className="col-12 col-md-3 col-sm-6 py-4">
          <img src={vacansoleil} alt="vacansoleil" />
        </div>
        <div className="col-12 col-md-3 col-sm-6 py-4">
          <img src={hepatica} alt="hepatica" />
        </div>
        <div className="col-12 col-md-3 col-sm-6 py-4">
          <img src={metaloplastyka} alt="metaloplastyka" />
        </div>
        <div className="col-12 col-md-3 col-sm-6 py-4">
          <img src={asbud} alt="asbud" />
        </div>
        <div className="col-12 col-md-3 col-sm-6 py-4">
          <img src={ckpartners} alt="ck partners" />
        </div>
        <div className="col-12 col-md-3 col-sm-6 py-4">
          <img src={misspolski} alt="miss polski" />
        </div>
        <div className="col-12 col-md-3 col-sm-6 py-4">
          <img src={hotelroyalbotanic} alt="hotel royalbotanic" />
        </div>
      </div>
    </div>
  </div>
)

export default Partners
