import React, { FC } from "react";
import styles from "./page.module.scss";
import portfolio from "./portfolio.json";

const Portfolio: FC = () => {
  return (
    <>
      <h1 className="title">Last projects</h1>
      {portfolio.map((project) => (
        <div className={styles.project}>
          <div className={styles.title}>{project.title}</div>
          <div className={styles.description}>{project.description}</div>
          <div className={styles.block}>
            <div className={styles.name}>period of time:</div>
            <div className={styles.description}>{project.time}</div>
          </div>
          <div className={styles.block}>
            <div className={styles.name}>tasks:</div>
            <div className={styles.description}>
              <ul className={styles.tasks}>
                {project.tasks.map((task) => (
                  <li>{task}</li>
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
                <a target="_blank" href={link.url}>
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Portfolio;
