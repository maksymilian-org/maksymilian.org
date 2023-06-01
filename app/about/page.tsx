import React, { FC } from "react";
import Image from "next/image";
import { calculateAge } from "../../utils/calculateAge";
import Technology from "../../components/technology/Technology";
import { Skill } from "../../enums/Skill";
import styles from "./page.module.scss";

const About: FC = () => {
  const age = calculateAge("12.06.1993");

  return (
    <>
      <h1 className="title">More details</h1>
      <section>
        <div className="cols">
          <div className="col">
            <div className="section-name">name:</div>
            <div className="description">Maksymilian Furtak</div>

            <div className="section-name">age:</div>
            <div className="description">{age}</div>
          </div>

          <div className="col">
            <div className="section-name">city:</div>

            <div className="description">
              <a
                target="_blank"
                href="https://www.google.com/maps?q=Lublin,Poland"
              >
                Lublin, Poland
              </a>
            </div>

            <div className="section-name">languages:</div>
            <div className="description">Polish, English B1</div>
          </div>

          <div className="col">
            <Image
              src="/assets/maksymilian.jpg"
              alt="maksymilian.org"
              width={200}
              height={200}
              className={styles.profilePhoto}
            />
          </div>
        </div>
      </section>
      <section>
        <div className="section-name">main technologies:</div>
        <div className="cols">
          <div className="col">
            <Technology name="react" skill={Skill.EXPERT} />
          </div>
          <div className="col">
            <Technology name="typescript" skill={Skill.EXPERT} />
          </div>
          <div className="col">
            <Technology name="javascript" skill={Skill.EXPERT} />
          </div>
        </div>
        <div className="cols">
          <div className="col">
            <Technology name="angular" skill={Skill.REGULAR} />
          </div>
          <div className="col">
            <Technology name="vue" skill={Skill.JUNIOR} />
          </div>
          <div className="col">
            <Technology name="node" skill={Skill.REGULAR} />
          </div>
        </div>
        <div className="cols">
          <div className="col">
            <Technology name="html" skill={Skill.EXPERT} />
          </div>
          <div className="col">
            <Technology name="css" skill={Skill.EXPERT} />
          </div>
          <div className="col">
            <Technology name="git" skill={Skill.EXPERT} />
          </div>
        </div>
      </section>

      <section>
        <div className="section-name">additional skills:</div>
        <div className="description">
          Docker, Redux, RTK Query, React Native, NextJS, Gatsby, Vite, Vitest,
          Jasmine, Cypress, WebdriverIO, WordPress, PHP, Python, MySQL,
          PostgreSQL, REST, Webpack, Electron, RWD, jQuery, RxJS, WebSockets,
          AWS, Confuence, BitBucket, Jira, Asana, GitHub, GitLab, VSCode
        </div>
      </section>

      <section>
        <div className="section-name">jobs:</div>
        <div className="description">
          01.2021 - now
          <br />
          Regular Frontend Developer
          <br />
          <a target="_blank" href="https://embiq.com/">
            Embiq Sp. z o.o.
          </a>{" "}
          / Lublin, Poland
        </div>
        <div className="description">
          02.2019 - 08.2020
          <br />
          Junior Frontend Developer
          <br />
          <a target="_blank" href="https://ingrifo.com/">
            Ingrifo Sp. z o.o.
          </a>{" "}
          / Warsaw, Poland
        </div>
        <div className="description">
          09.2016 - now
          <br />
          Frontend Developer
          <br />
          <a href="https://maksymilian.org/">Maksymilian.org</a> (self-employed)
          / Lublin, Poland
        </div>
      </section>

      <section>
        <div className="section-name">education:</div>
        <div className="description">
          2016
          <br />
          Engineer
          <br />
          <a target="_blank" href="https://up.lublin.pl/">
            University of Life Sciences
          </a>{" "}
          / Lublin, Poland
        </div>
      </section>

      <section>
        <div className="section-name">interests:</div>
        <div className="description">
          wife & family
          <br />
          <a target="_blank" href="https://www.facebook.com/ospkonopnica/">
            firefighting
          </a>{" "}
          (a squad leader in a volunteer fire department)
          <br />
          motorcycle / bike tourism
          <br />
          history
          <br />
          medical rescue (qualified first-aid qualifications)
          <br />
          amateur football
        </div>
      </section>
    </>
  );
};

export default About;
