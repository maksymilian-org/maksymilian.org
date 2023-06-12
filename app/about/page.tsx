import React, { FC } from "react";
import Image from "next/image";
import { calculateAge } from "../../utils/calculateAge";
import { Skill } from "../../enums/Skill";
import Technology from "../../components/technology/Technology";
import FadeIn from "../../components/fadein/FadeIn";
import TextBlock from "../../components/text-block/TextBlock";
import Title from "../../components/title/Title";
import styles from "./page.module.scss";
import Cols from "../../components/cols/Cols";
import Link from "../../components/links/Link";

const About: FC = () => {
  const age = calculateAge("12.06.1993");

  return (
    <FadeIn>
      <Title>More details</Title>
      <TextBlock>
        <Cols>
          <div>
            <Image
              src="/assets/maksymilian.jpg"
              alt="maksymilian.org"
              width={140}
              height={140}
              className={styles.profilePhoto}
            />
          </div>

          <div>
            <TextBlock title="name:">Maksymilian Furtak</TextBlock>
            <TextBlock title="age:">{age}</TextBlock>
          </div>
          <div>
            <TextBlock title="city:">
              <Link url="https://www.google.com/maps?q=Lublin,Poland">
                Lublin, Poland
              </Link>
            </TextBlock>
            <TextBlock title="languages:">Polish, English B1</TextBlock>
          </div>
        </Cols>
      </TextBlock>
      <TextBlock title="main technologies:">
        <Cols>
          <div>
            <Technology name="react" skill={Skill.EXPERT} />
          </div>
          <div>
            <Technology name="typescript" skill={Skill.EXPERT} />
          </div>
          <div>
            <Technology name="javascript" skill={Skill.EXPERT} />
          </div>
        </Cols>
        <Cols>
          <div>
            <Technology name="angular" skill={Skill.REGULAR} />
          </div>
          <div>
            <Technology name="vue" skill={Skill.JUNIOR} />
          </div>
          <div>
            <Technology name="node" skill={Skill.REGULAR} />
          </div>
        </Cols>
        <Cols>
          <div>
            <Technology name="html" skill={Skill.EXPERT} />
          </div>
          <div>
            <Technology name="css" skill={Skill.EXPERT} />
          </div>
          <div>
            <Technology name="git" skill={Skill.EXPERT} />
          </div>
        </Cols>
      </TextBlock>

      <TextBlock title="additional skills:">
        NextJS, Redux, RTK Query, React Native, Gatsby, Vite, Vitest, Jasmine,
        Cypress, WebdriverIO, REST, Webpack, Electron, RxJS, jQuery, WebSockets,
        RWD, WordPress, PHP, Python, MySQL, PostgreSQL, Docker, AWS, Confuence,
        BitBucket, Jira, Asana, GitHub, GitLab, VSCode
      </TextBlock>

      <TextBlock title="jobs:">
        <p>
          01.2021 - now
          <br />
          Regular Frontend Developer
          <br />
          <Link url="https://embiq.com/">Embiq</Link> / Lublin, Poland
        </p>
        <p>
          02.2019 - 08.2020
          <br />
          Junior Frontend Developer
          <br />
          <Link url="https://ingrifo.com/">Ingrifo</Link> / Warsaw, Poland
        </p>
        <p>
          09.2016 - now
          <br />
          Frontend Developer
          <br />
          <Link url="https://maksymilian.org/">Maksymilian.org</Link>{" "}
          (self-employed) / Lublin, Poland
        </p>
      </TextBlock>

      <TextBlock title="education:">
        2016
        <br />
        Engineer
        <br />
        <Link url="https://up.lublin.pl/">University of Life Sciences</Link> /
        Lublin, Poland
      </TextBlock>

      <TextBlock title="interests:">
        wife & family
        <br />
        <Link url="https://www.facebook.com/ospkonopnica/">
          firefighting
        </Link>{" "}
        (a squad leader in a volunteer fire department)
        <br />
        motorcycle/bike tourism
        <br />
        history
        <br />
        medical rescue (qualified first-aid qualifications)
        <br />
        amateur football
      </TextBlock>
    </FadeIn>
  );
};

export default About;
