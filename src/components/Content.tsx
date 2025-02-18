/**
 * Component responsible for rendering and measuring the content.
 * Updates the engine store with the content's size.
 */

import { animated } from "@react-spring/web";
import { useRef } from "react";
import { useEngineStore } from "../engine/useEngineStore";

import { ContentSpring } from "../hooks/useGestureBindings";
import { useRectObserver } from "../hooks/useRectObserver";

interface IFProps {
  children?: React.ReactNode;
  contentSpring: ContentSpring;
}

export const Content = ({ children, contentSpring }: IFProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const setContentRect = useEngineStore((s) => s.setContentRect);

  /**
   * We use the useRectObserver hook to observe the container's size
   * and store it in the engine store.
   */
  useRectObserver({ ref, setRect: setContentRect });

  return (
    <animated.div
      ref={ref}
      className="absolute bg-blue-500"
      style={contentSpring[0]}
    >
      {children}
    </animated.div>
  );
};
