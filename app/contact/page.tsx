import React, { FC } from "react";
import Social from "../../components/social/Social";
import { FadeIn } from "../../components/fadein/FadeIn";

const Contact: FC = () => {
  return (
    <FadeIn>
      <h1 className="title">Let&apos;s talk</h1>
      <div className="description">
        Would you like to hire me for a project?{" "}
      </div>
      <div className="description">
        <a href="tel:+48785120693">+48 785 120 693</a>
      </div>
      <div className="description">furtak[at]maksymilian.org</div>
      <Social />
    </FadeIn>
  );
};

export default Contact;
