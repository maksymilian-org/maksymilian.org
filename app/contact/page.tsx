import React, { FC } from "react";
import GithubIcon from "./icons/Github";
import LinkerInIcon from "./icons/LinkedIn";
import MessengerIcon from "./icons/Messenger";
import SkypeIcon from "./icons/Skype";
import styles from "./page.module.scss";

const Contact: FC = () => {
  return (
    <>
      <h1 className="title">Let's talk</h1>
      <div className="description">Would you like to hire me for a project? </div>
      <div className="description"><a href="tel:+48785120693">+48 785 120 693</a></div>
      <div className="description">furtak[at]maksymilian.org</div>
      <ul className={styles.icons}>
        <li>
          <a
            href="https://github.com/maksymilian-org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
          </a>
        </li>
        <li>
          <a
            href="https://linkedin.com/in/maksymilian-furtak"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkerInIcon />
          </a>
        </li>
        <li>
          <a
            href="https://m.me/maksymilian.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessengerIcon />
          </a>
        </li>
        <li>
          <a
            href="skype:maksymilian.org?call"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SkypeIcon />
          </a>
        </li>
      </ul>
    </>
  );
};

export default Contact;
