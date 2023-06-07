import React, { FC, PropsWithChildren } from "react";
import classnames from "classnames";

import styles from "./TextBlock.module.scss";

interface ITextBlock {
  title?: string;
  header?: boolean;
}

const TextBlock: FC<PropsWithChildren<ITextBlock>> = ({
  title,
  header,
  children,
}) => {
  return (
    <div className={styles.block}>
      <div className={classnames(styles.title, header && styles.header)}>
        {title}
      </div>
      <div className={styles.description}>{children}</div>
    </div>
  );
};

export default TextBlock;
