import { FC } from "react";
import FadeIn from "../components/fadein/FadeIn";
import Title from "../components/title/Title";
import Subtitle from "../components/subtitle/Subtitle";
import Link from "../components/links/Link";

const Home: FC = () => {
  return (
    <FadeIn>
      <Title>Hello.</Title>
      <Subtitle>My name is Max Furtak.</Subtitle>
      <p>
        I am a frontend developer. I especially like React and Vue in
        conjunction with TypeScript, but I also love learning new things. You
        can find me on{" "}
        <Link url="https://github.com/maksymilian-org">GitHub</Link> and{" "}
        <Link url="https://linkedin.com/in/maksymilian-furtak">LinkedIn</Link>.
      </p>

      <p>
        I live in Lublin (Poland) and I am the happiest husband in the world. In
        my free time I ride a motorcycle and in case of an emergency I am{" "}
        <Link url="https://www.facebook.com/ospkonopnica">
          a volunteer fireman
        </Link>
        .
      </p>
    </FadeIn>
  );
};

export default Home;
