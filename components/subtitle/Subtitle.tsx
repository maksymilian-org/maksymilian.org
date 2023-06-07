import React, { FC, PropsWithChildren } from "react";
import styles from "./Subtitle.module.scss";

const Subtitle: FC<PropsWithChildren> = ({ children }) => {
  return <h1 className={styles.subtitle}>{children}</h1>;
};

export default Subtitle;
