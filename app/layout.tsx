import { FC, PropsWithChildren } from "react";
import { Rubik } from "next/font/google";
import { Metadata } from "next";
import { NAV_LINKS } from "../constants/nav-links";
import { Theme } from "../enums/Theme";
import Head from "../components/head";
import Navigation from "../components/navigation/Navigation";
import GoogleAnalytics from "../components/google-analytics/GoogleAnalytics";

import "../styles/global.scss";

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
});

const title = "maksymilian.org - frontend developer";

export const metadata: Metadata = {
  title: {
    template: `%s | ${title}`,
    default: title,
  },
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  const theme = Theme.LIGHT;

  return (
    <html lang="en" data-theme={theme} className={rubik.className}>
      <Head />
      <body>
        <div className="container">
          <main className="main">{children}</main>
        </div>
        <Navigation navLinks={NAV_LINKS} />
        <GoogleAnalytics />
      </body>
    </html>
  );
};
export default RootLayout;
