import React, { FC, useEffect } from "react";
import { Skill } from "../../enums/Skill";
import styles from "./Technology.module.scss";
import ReactJs from "./logos/React";
import TypeScript from "./logos/TypeScript";
import JavaScript from "./logos/JavaScript";
import Angular from "./logos/Angular";
import Vue from "./logos/Vue";
import Node from "./logos/Node";
import HTML from "./logos/HTML";
import CSS from "./logos/CSS";
import Git from "./logos/Git";

interface ITechnology {
  name: string;
  skill: Skill;
}

interface TechnologyLogoMap {
  [name: string]: {
    logo: React.JSX.Element;
    title: string;
  };
}

const TECHNOLOGY_LOGO_MAP: TechnologyLogoMap = {
  react: { logo: <ReactJs />, title: "React" },
  typescript: { logo: <TypeScript />, title: "TypeScript" },
  javascript: { logo: <JavaScript />, title: "JavaScript" },
  angular: { logo: <Angular />, title: "Angular" },
  vue: { logo: <Vue />, title: "Vue" },
  node: { logo: <Node />, title: "Node.js" },
  html: { logo: <HTML />, title: "HTML5" },
  css: { logo: <CSS />, title: "Sass, CSS3" },
  git: { logo: <Git />, title: "Git" },
};

const Technology: FC<ITechnology> = ({ name, skill }) => {
  const { logo, title } = TECHNOLOGY_LOGO_MAP[name];

  return (
    <div className={styles.technology}>
      <div className={styles.logo}>{logo}</div>
      <div className={styles.name}>
        <div className={styles.title}>{title}</div>
        <div className={styles.skill}>
          {Array(5)
            .fill("")
            .map((_, index) => (
              <div className={index <= skill ? styles.achieved : ""}></div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Technology;
