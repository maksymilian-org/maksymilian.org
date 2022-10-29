import { FC } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

const Home: FC = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Hello.</h1>

        <h2 className={styles.subtitle}>My name is Max Furtak.</h2>

        <p className={styles.description}>
          I am a frontend developer. I especially liked React and Vue in
          conjunction with TypeScript, but I also love to learn new things. You
          can find me on{" "}
          <a
            href="https://github.com/maksymilian-org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>{" "}
          and{" "}
          <a
            href="https://linkedin.com/in/maksymilian-furtak"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          .
        </p>

        <p className={styles.description}>
          I live in Lublin (Poland). I am a surveyor by education. In my free
          time I run and ride an electric bicycle and in case of an emergency I
          am{" "}
          <a
            href="https://www.facebook.com/ospkonopnica"
            target="_blank"
            rel="noopener noreferrer"
          >
            a volunteer fireman
          </a>
          .
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
