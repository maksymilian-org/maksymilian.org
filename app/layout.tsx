"use client";

import Head from "../components/head";
import Navigation from "../components/navigation/Navigation";
import "../styles/global.scss";
import { NAV_LINKS } from "../constants/nav-links";
import { Theme } from "../enums/Theme";
import { useState } from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(Theme.LIGHT);

  return (
    <html lang="en" data-theme={theme}>
      <Head />
      <body>
        <div className="container">
          <main className="main">{children}</main>
        </div>
        <Navigation navLinks={NAV_LINKS} />
      </body>
    </html>
  );
};
export default RootLayout;
