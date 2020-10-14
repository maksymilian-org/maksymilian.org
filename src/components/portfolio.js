import React from "react"
import "./portfolio.scss"
import stajniawojciechow from "../images/stajnia-wojciechow.jpg"
import sklepkardaski from "../images/sklep-kardaski.jpg"
import apartamentyogrodowa from "../images/apartamenty-ogrodowa.jpg"
import hotelmlyn from "../images/hotel-mlyn-lublin.jpg"
import civitaschristiana from "../images/civitas-christiana.jpg"
import hotelrotalbotanic from "../images/hotel-royal-botanic-lublin.jpg"
import forchetto from "../images/forchetto.jpg"
import vacansoleil from "../images/vacansoleil-magyarorszag.jpg"
import wykladzinymarkowe from "../images/wykladziny-markowe-lublin.jpg"
import szkolastasin from "../images/szkola-stasin.jpg"
import tkdeweloper from "../images/tkdeweloper.jpg"
import asbud from "../images/asbud-lagow.jpg"
import dermatolog from "../images/dermatolog.jpg"
import welldding from "../images/wellding-konsultantka-slubna.jpg"
import sharpgames from "../images/sharpgames-gry-planszowe.jpg"
import ksiegowyplus from "../images/ksiegowy-plus-bialystok.jpg"
import ecotechnika from "../images/eco-technika.jpg"
import fundacjarozwojupolski from "../images/fundacja-rozwoju-polski.jpg"
import Tr from "./tr"

const Portfolio = () => {
  const items = [
    {
      title: "Stajnia Wojciechów",
      description: "",
      type: "website, blog",
      url: "https://koniewojciechow.pl/",
      img: stajniawojciechow,
      technologies: ["html", "css", "js", "wordpress"],
    },
    {
      title: "Kardaski",
      description: "",
      type: "shop",
      url: "https://kardaskicrew.com/",
      img: sklepkardaski,
      technologies: ["html", "css", "js", "wordpress", "woocommerce"],
    },
    {
      title: "Apartamenty Ogrodowa",
      description: "",
      type: "website",
      url: "http://apartamentyogrodowa.pl/",
      img: apartamentyogrodowa,
      technologies: ["html", "css", "js", "wordpress"],
    },
    {
      title: "Hotel Młyn",
      description: "",
      type: "website",
      url: "",
      img: hotelmlyn,
      technologies: ["html", "css", "js", "wordpress"],
    },
    {
      title: "Fundacja Civitas Christiana",
      description: "",
      type: "website",
      url: "https://fundacja.civitaschristiana.pl/",
      img: civitaschristiana,
      technologies: ["html", "css", "js", "wordpress"],
    },
    {
      title: "Hotel Royal Botanic",
      description: "",
      type: "website",
      url: "https://hotel-royalbotanic.pl/",
      img: hotelrotalbotanic,
      technologies: ["html", "css", "js", "wordpress"],
    },
    {
      title: "Forchetto",
      description: "",
      type: "website",
      url: "http://forchetto.com/",
      img: forchetto,
      technologies: ["html", "css", "js", "wordpress"],
    },
    {
      title: "Vacansoleil Hungary",
      description: "",
      type: "blog",
      url: "https://www.vacansoleil.hu/blog/",
      img: vacansoleil,
      technologies: ["html", "css", "js", "wordpress"],
    },
    {
      title: "Wykładziny Markowe",
      description: "",
      type: "website, product catalog",
      url: "http://wykladzinymarkowe.pl/",
      img: wykladzinymarkowe,
      technologies: ["html", "css", "js", "wordpress"],
    },
    {
      title: "Szkoła w Stasinie",
      description: "",
      type: "website, blog",
      url: "http://spstasin.com.pl/",
      img: szkolastasin,
      technologies: ["html", "css", "js", "wordpress"],
    },
    {
      title: "TK Deweloper",
      description: "",
      type: "website, blog",
      url: "http://tkdeweloper.pl/",
      img: tkdeweloper,
      technologies: ["html", "css", "js", "wordpress"],
    },
    {
      title: "Asbud",
      description: "",
      type: "interactive animations",
      url:
        "https://asbud-lagow.pl/realizacje-asbud/osiedle-domow-jednorodzinnych-rozlogach/",
      img: asbud,
      technologies: ["html", "css", "js"],
    },
    {
      title: "Dermatolog Lublin",
      description: "",
      type: "website",
      url: "https://dermatologlublin.com.pl/",
      img: dermatolog,
      technologies: ["html", "css", "js", "wordpress"],
    },
    {
      title: "Welldding",
      description: "",
      type: "website",
      url: "https://welldding.pl/",
      img: welldding,
      technologies: ["html", "css", "js", "wordpress"],
    },
    {
      title: "Sharpgames",
      description: "",
      type: "website, product catalog",
      url: "",
      img: sharpgames,
      technologies: ["html", "css", "js", "wordpress"],
    },
    {
      title: "Księgowy Plus",
      description: "",
      type: "website",
      url: "http://ksiegowy.plus/",
      img: ksiegowyplus,
      technologies: ["html", "css", "js", "wordpress"],
    },
    {
      title: "Eco-Technika",
      description: "",
      type: "website",
      url: "http://www.ecotechnika.pl/",
      img: ecotechnika,
      technologies: ["html", "css", "js", "wordpress"],
    },
    {
      title: "Fundacja Rozwoju Polski",
      description: "",
      type: "website",
      url: "",
      img: fundacjarozwojupolski,
      technologies: ["html", "css", "js", "wordpress"],
    },
  ]

  const technologies = {
    html: {
      type: "icon",
      class: "fab fa-html5",
      color: "#fd7e14",
    },
    css: {
      type: "icon",
      class: "fab fa-css3-alt",
      color: "#006eba",
    },
    js: {
      type: "icon",
      class: "fab fa-js",
      color: "#fddc22",
    },
    wordpress: {
      type: "icon",
      class: "fab fa-wordpress-simple",
      color: "#23282d",
    },
  }

  return (
    <div className="container-fluid pad-ver portfolio">
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        <Tr>My|Moje</Tr>{" "}
        <span>
          <Tr>works|realizacje</Tr>
        </span>
      </h1>
      <div className="row" style={{ margin: 0 }}>
        {items.map(item => (
          <div className="col-md-2 col-sm-3 portfolio-item" key={item.title}>
            <img src={item.img} alt={item.title} className="portfolio-img" />
            <div className="portfolio-details">
              {item.title && (
                <div className="portfolio-title">{item.title}</div>
              )}
              {item.type && <div className="portfolio-type">{item.type}</div>}
              {item.description && (
                <div className="portfolio-description">{item.description}</div>
              )}
              {item.technologies && (
                <div className="portfolio-technologies">
                  {item.technologies.map(
                    technology =>
                      technologies[technology] &&
                      technologies[technology].type === "icon" && (
                        <span
                          key={technology}
                          className="portfolio-technology"
                          style={{ background: technologies[technology].color }}
                        >
                          <i className={technologies[technology].class}></i>
                        </span>
                      )
                  )}
                  {item.url && (
                    <a href={item.url} target="blank" className="portfolio-url">
                      <i className="fas fa-link"></i>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Portfolio
