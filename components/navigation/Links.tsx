"use client";

import React, { FC } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NavLink } from "../../types/nav-link";
import styles from "./Links.module.scss";

interface ILink {
  navLinks: NavLink[];
}

const Links: FC<ILink> = ({ navLinks }) => {
  const pathname = usePathname();

  return (
    <>
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
    </>
  );
};

export default Links;
