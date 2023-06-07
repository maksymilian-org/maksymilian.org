import React, { FC, PropsWithChildren } from "react";
import styles from "./Title.module.scss";

const Title: FC<PropsWithChildren> = ({ children }) => {
  return <h1 className={styles.title}>{children}</h1>;
};

export default Title;
