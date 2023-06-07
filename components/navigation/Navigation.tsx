import React, { FC } from "react";
import { NavLink } from "../../types/nav-link";
import Links from "./Links";
import styles from "./Navigation.module.scss";

interface INavigation {
  navLinks: NavLink[];
}

const Navigation: FC<INavigation> = ({ navLinks }) => (
  <footer className={styles.footer}>
    <main className={styles.wrapper}>
      <Links navLinks={navLinks} />
    </main>
  </footer>
);

export default Navigation;
