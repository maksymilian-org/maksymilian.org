import React, { FC } from "react";
import Link from "./Link";

import styles from "./Links.module.scss";

interface ILink {
  title: string;
  url: string;
  target?: string;
}

const Links: FC<{ links: ILink[] }> = ({ links }) => {
  return (
    <div className={styles.links}>
      {links.map((link) => (
        <Link key={link.title} url={link.url}>
          {link.title}
        </Link>
      ))}
    </div>
  );
};

export default Links;
