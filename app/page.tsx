import { FC } from "react";

const Home: FC = () => {
  return (
    <>
      <h1 className="title">Hello.</h1>
      <h2 className="subtitle">My name is Max Furtak.</h2>
      <p className="description">
        I am a frontend developer. I especially like React and Vue in
        conjunction with TypeScript, but I also love learning new things. You
        can find me on{" "}
        <a
          href="https://github.com/maksymilian-org"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
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

      <p className="description">
        I live in Lublin (Poland) and I am the happiest husband in the world. In
        my free time I ride a motorcycle and in case of an emergency I am{" "}
        <a
          href="https://www.facebook.com/ospkonopnica"
          target="_blank"
          rel="noopener noreferrer"
        >
          a volunteer fireman
        </a>
        .
      </p>
    </>
  );
};

export default Home;
