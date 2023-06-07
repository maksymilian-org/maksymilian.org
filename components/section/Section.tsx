import React, { FC, PropsWithChildren } from "react";
import styles from "./Section.module.scss";

const Section: FC<PropsWithChildren> = ({ children }) => {
  return <section className={styles.section}>{children}</section>;
};

export default Section;
