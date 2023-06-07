import React, { FC, PropsWithChildren } from "react";

import styles from "./Link.module.scss";

interface ILink {
  url: string;
  target?: string;
  rel?: string;
  underline?: boolean;
}

const Link: FC<PropsWithChildren<ILink>> = ({
  url,
  target,
  rel,
  underline = true,
  children,
}) => {
  return (
    <a
      target={target || "_blank"}
      href={url}
      className={underline ? styles.link : ""}
      rel={rel || "noopener noreferrer"}
    >
      {children}
    </a>
  );
};

export default Link;
