import React, { FC } from "react";
import styles from "./page.module.scss";

const Portfolio: FC = () => {
  return (
    <>
      <h1 className="title">My projects</h1>
      <div className={styles.project}>
        <div className={styles.title}>
          Web app helps control the behaviours of the processes
        </div>
        <div className={styles.description}>
          based on algorithms and automation, refecting them in the model and
          checking their parameters based on the history of business events and
          a reconstruction of programmed customer behaviours.
        </div>
        <div className={styles.block}>
          <div className={styles.name}>period of time:</div> 1 year 8 months
        </div>
        <div className={styles.block}>
          <div className={styles.name}>tasks:</div>
          <ul className={styles.tasks}>
            <li>implement responsive dashboard with scalable and</li>
            <li>drag&droped tiles</li>
            <li>creating various sort of charts, tables, 3D graphs, dialogs</li>
            <li>communication with API</li>
            <li>creating custom controls and UI elements</li>
            <li>bug fixing</li>
            <li>maintaining the application</li>
            <li>introducing new functionalities</li>
            <li>code review</li>
            <li>creating views</li>
          </ul>
        </div>
        <div className={styles.block}>
          <div className={styles.name}>technologies:</div>
          Redux, React, TypeScript, JavaScript, GitLab, Highcharts, D3.js, SCSS,
          PostgreSQL
        </div>
        <div className={styles.block}>
          <div className={styles.name}>links:</div>
          <div className={styles.links}>
            <a target="_blank" href="https://intrack.eu/">
              intrack.eu
            </a>
            ,{" "}
            <a target="_blank" href="https://ingrifo.com/">
              ingrifo.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
