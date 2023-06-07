import React, { FC } from "react";
import GithubIcon from "../../components/social/icons/Github";
import LinkedInIcon from "../../components/social/icons/LinkedIn";
import MessengerIcon from "../../components/social/icons/Messenger";
import SkypeIcon from "../../components/social/icons/Skype";
import styles from "./Social.module.scss";
import Link from "../links/Link";

const Social: FC = () => {
  return (
    <ul className={styles.icons}>
      <li>
        <Link url="https://github.com/maksymilian-org" underline={false}>
          <GithubIcon />
        </Link>
      </li>
      <li>
        <Link
          url="https://linkedin.com/in/maksymilian-furtak"
          underline={false}
        >
          <LinkedInIcon />
        </Link>
      </li>
      <li>
        <Link url="https://m.me/maksymilian.org" underline={false}>
          <MessengerIcon />
        </Link>
      </li>
      <li>
        <Link url="skype:maksymilian.org?call" underline={false}>
          <SkypeIcon />
        </Link>
      </li>
    </ul>
  );
};

export default Social;
