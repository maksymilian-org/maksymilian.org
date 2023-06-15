"use client";

import { animated, useSpring } from "@react-spring/web";
import { FC, PropsWithChildren, useEffect } from "react";

const FadeIn: FC<PropsWithChildren> = ({ children }) => {
  const config = {
    from: { opacity: 0, transform: "translateY(24px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  };

  const [props, api] = useSpring(() => config);

  useEffect(() => {
    api.start(config);
  }, [api, config]);

  return <animated.div style={props}>{children}</animated.div>;
};

export default FadeIn;
