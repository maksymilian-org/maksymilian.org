import Head from "../components/head";
import Footer from "../components/footer/Footer";
import "./global.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <Head />
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
};
export default RootLayout;
