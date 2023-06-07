"use client";

import { animated, useSpring } from "@react-spring/web";
import { FC, useEffect } from "react";

export const FadeIn: FC<any> = ({ children }) => {
  const config = {
    from: { opacity: 0, transform: "translateY(24px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  };

  const [props, api] = useSpring(() => config);

  useEffect(() => {
    api.start(config);
  }, []);

  return <animated.div style={props}>{children}</animated.div>;
};
