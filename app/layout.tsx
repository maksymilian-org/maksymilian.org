import Head from "../components/head";
import Navigation from "../components/navigation/Navigation";
import { NAV_LINKS } from "../constants/nav-links";
import { Theme } from "../enums/Theme";
import { Rubik } from "next/font/google";
import "../styles/global.scss";

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = Theme.LIGHT;

  return (
    <html lang="en" data-theme={theme} className={rubik.className}>
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
