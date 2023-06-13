import React, { FC } from "react";
import { Metadata } from "next";
import FadeIn from "../../components/fadein/FadeIn";
import Social from "../../components/social/Social";
import Title from "../../components/title/Title";
import Link from "../../components/links/Link";

export const metadata: Metadata = {
  title: "Contact",
};

const Contact: FC = () => {
  return (
    <FadeIn>
      <Title>Let&apos;s talk</Title>
      <p>Would you like to hire me for a project?</p>
      <p>
        <Link url="tel:+48785120693">+48 785 120 693</Link>
      </p>
      <p>furtak[at]maksymilian.org</p>
      <Social />
    </FadeIn>
  );
};

export default Contact;
