import React, { FC, PropsWithChildren } from "react";
import styles from "./Cols.module.scss";

const Cols: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.cols}>{children}</div>;
};

export default Cols;
