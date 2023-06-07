import React, { FC } from "react";
import styles from "./page.module.scss";
import projects from "./projects.json";
import websites from "./websites.json";
import forfun from "./forfun.json";
import { FadeIn } from "../../components/fadein/FadeIn";

const Portfolio: FC = () => {
  return (
    <FadeIn>
      <h1 className="title">Last projects</h1>
      {projects.map((project) => (
        <div key={project.title} className={styles.project}>
          <div className={styles.title}>{project.title}</div>
          <div className={styles.description}>{project.description}</div>
          <div className={styles.block}>
            <div className={styles.name}>duration:</div>
            <div className={styles.description}>{project.time}</div>
          </div>
          <div className={styles.block}>
            <div className={styles.name}>tasks:</div>
            <div className={styles.description}>
              <ul className={styles.tasks}>
                {project.tasks.map((task) => (
                  <li key={task}>{task}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.block}>
            <div className={styles.name}>technologies:</div>
            <div className={styles.description}>{project.technologies}</div>
          </div>
          <div className={styles.block}>
            <div className={styles.name}>framework:</div>
            <div className={styles.description}>{project.framework}</div>
          </div>
          <div className={styles.block}>
            <div className={styles.name}>team:</div>
            <div className={styles.description}>{project.team}</div>
          </div>
          <div className={styles.block}>
            <div className={styles.name}>links:</div>
            <div className={styles.links}>
              {project.links.map((link) => (
                <a key={link.title} target="_blank" href={link.url}>
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className={styles.websites}>
        <h1 className="title">Websites</h1>
        <div className="description">Before 2019 I created some websites.</div>
        <div className={styles.block}>
          <div className={styles.links}>
            {websites.map((link) => (
              <a key={link.title} target="_blank" href={link.url}>
                {link.title}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.forfun}>
        <h1 className="title">For fun</h1>
        <div className="description">
          Sometimes I want to make things just for fun.
        </div>
        {forfun.map((project) => (
          <div key={project.title} className={styles.project}>
            <div className={styles.title}>{project.title}</div>
            <div className={styles.description}>{project.description}</div>
            <div className={styles.block}>
              <div className={styles.name}>technologies:</div>
              <div className={styles.description}>{project.technologies}</div>
            </div>
            <div className={styles.block}>
              <div className={styles.name}>links:</div>
              <div className={styles.links}>
                {project.links.map((link) => (
                  <a key={link.title} target="_blank" href={link.url}>
                    {link.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </FadeIn>
  );
};

export default Portfolio;
