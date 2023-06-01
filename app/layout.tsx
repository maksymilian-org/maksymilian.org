import Head from "../components/head";
import Navigation from "../components/navigation/Navigation";
import "./global.scss";
import { NAV_LINKS } from "../constants/nav-links";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <Head />
      <body>
        <div className="container">
          <main className="main">{children}</main>
        </div>
        <Navigation navLinks={NAV_LINKS}/>
      </body>
    </html>
  );
};
export default RootLayout;
