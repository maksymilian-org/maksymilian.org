import React from "react"
import "./about.scss"
import face from "../images/face.jpg"
import Tr from "./tr"

const About = () => (
  <div className="container pad-ver">
    <div className="row middle-md">
      <div className="col-xs-4">
        <div className="face">
          <img src={face} />
        </div>
      </div>
      <div className="col-xs-6">
        <h1>
          <Tr>About|O</Tr>{" "}
          <span>
            <Tr>me|mnie</Tr>
          </span>
        </h1>
        <p style={{ textAlign: "justify" }}>
          <Tr>
            I'm Maksymilian Furtak and I live in Lublin (Poland). I am a
            surveyor by education, but since 2015 I have been working as a
            frontend developer. I work on a B2B basis, both for small
            entrepreneurs in my area and large IT companies from all over
            Poland.|Nazywam się Maksymilian Furtak i mieszkam w Lublinie. Z
            wykształcenia jestem geodetą, ale od 2015 roku zajmuję się wyłącznie
            frontend developerowaniem. Pracuję na zasadach B2B zarówno dla
            drobnych, lokalnych przedsiębiorców, jak i większych firm IT z całej
            Polski.
          </Tr>
        </p>
        <p style={{ textAlign: "justify" }}>
          <Tr>
            I love to learn new things. My ambition is to work as a fullstack
            developer in the near future. In my free time I run and ride an
            electric bicycle and in case of an emergency I am a volunteer
            fireman.|Uwielbiam uczyć się nowych rzeczy. Moją ambicją na
            najbliższą przyszłość jest praca jako fullstack developer. W wolnych
            chwilach biegam i jeżdżę na rowerze elektrycznym, a gdy zawyje
            syrena w pobliskiej jednostce OSP - jestem strażakiem.
          </Tr>
        </p>
      </div>

      <div className="col-xs-2"></div>
    </div>
    <div className="skills">
      <div style={{ width: "18%" }}>
        <div>HTML</div>
        <div style={{ background: "#E24A23" }}></div>
      </div>
      <div style={{ width: "18%" }}>
        <div>SCSS</div>
        <div style={{ background: "#006EBA" }}></div>
      </div>
      <div style={{ width: "18%" }}>
        <div>JavaScript</div>
        <div style={{ background: "#FDDC22" }}></div>
      </div>
      <div style={{ width: "10%" }}>
        <div>TypeScript</div>
        <div style={{ background: "#3178C6" }}></div>
      </div>
      <div style={{ width: "10%" }}>
        <div>React</div>
        <div style={{ background: "#61DAFB" }}></div>
      </div>
      <div style={{ width: "5%" }}>
        <div>PHP</div>
        <div style={{ background: "#787CB4" }}></div>
      </div>
      <div style={{ width: "8%" }}>
        <div>WordPress</div>
        <div style={{ background: "#23282D" }}></div>
      </div>
      <div style={{ width: "5%" }}>
        <div>SQL</div>
        <div style={{ background: "#757575" }}></div>
      </div>
      <div style={{ width: "8%" }}>
        <div>Git</div>
        <div style={{ background: "#F54D27" }}></div>
      </div>
    </div>
  </div>
)

export default About
