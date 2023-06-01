import React, { FC } from "react";
import GithubIcon from "../../components/social/icons/Github";
import LinkerInIcon from "../../components/social/icons/LinkedIn";
import MessengerIcon from "../../components/social/icons/Messenger";
import SkypeIcon from "../../components/social/icons/Skype";
import styles from "./Social.module.scss";

const Social: FC = () => {
  return (
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
  );
};

export default Social;
