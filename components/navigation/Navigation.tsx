"use client"

import React, { FC } from "react";
import styles from "./Navigation.module.scss";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NavLink } from "../../types/nav-link";

interface INavigation {
  navLinks: NavLink[];
}

const Navigation: FC<INavigation> = ({ navLinks }) => {
  const pathname = usePathname();

  return (
    <footer className={styles.footer}>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            className={isActive ? styles.active : ""}
            href={link.href}
            key={link.name}
          >
            {link.name}
          </Link>
        );
      })}
    </footer>
  );
};

export default Navigation;
