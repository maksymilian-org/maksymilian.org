import Head from "../components/head";
import './global.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <Head />
      <body>{children}</body>
    </html>
  );
};
export default RootLayout;
