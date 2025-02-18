import { animated } from "@react-spring/web";
import { forwardRef, ReactNode } from "react";
import { IFContentSpring } from "./useDTEngine";
import { useGestureBindings } from "./useGestureBindings";

export interface IFContainerProps {
  contentSpring: IFContentSpring;
  contentM: {
    width: number;
    height: number;
  };

  children?: ReactNode;
  onReady?: () => void;
}

export const DTContainer = forwardRef<HTMLDivElement, IFContainerProps>(
  ({ children, contentSpring, contentM, onReady }, ref) => {
    const bindings = useGestureBindings({
      contentSpring: contentSpring,
      contentM,
    });

    return (
      <animated.div
        onLoadCapture={onReady}
        {...bindings}
        ref={ref}
        id="dt-container"
        className="relative border-2 w-full grow overflow-hidden touch-none"
      >
        {children}
      </animated.div>
    );
  }
);
