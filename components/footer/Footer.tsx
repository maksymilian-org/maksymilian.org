import React, { FC } from "react";
import GithubIcon from "../icons/Github";
import LinkerInIcon from "../icons/LinkedIn";
import MessengerIcon from "../icons/Messenger";
import SkypeIcon from "../icons/Skype";
import styles from "./Footer.module.scss";

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <span>+48 785 120 693</span>
        <span>furtak[at]maksymilian.org</span>
        <ul>
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
      </div>
    </footer>
  );
};

export default Footer;
