import { animated } from "@react-spring/web";
import { ReactNode } from "react";
import { IFContentSpring } from "./useDTEngine";

interface IFProps {
  contentSpring: IFContentSpring[0];
  children?: ReactNode;
}

export const DTContent = ({ contentSpring, children }: IFProps) => {
  return (
    <animated.div
      style={{
        x: contentSpring.x,
        y: contentSpring.y,
        width: contentSpring.width,
        height: contentSpring.height,
      }}
      className="absolute bg-muted "
    >
      {children}
    </animated.div>
  );
};
