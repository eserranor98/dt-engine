import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useRef } from "react";

interface DTItemWrapperProps {
  children: React.ReactNode;
  initialPosition: [number, number];
  scalesWidthContent?: boolean;
}

export function DTItemWrapper({
  children,
  initialPosition,
}: DTItemWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [style, api] = useSpring(() => ({
    x: initialPosition[0],
    y: initialPosition[1],
    width: 44,
    height: 44,
  }));

  const drag = useDrag(
    ({ offset: [x, y] }) => {
      api.set({ x, y });
    },
    {
      from: () => [style.x.get(), style.y.get()],
    }
  );

  return (
    <animated.div
      ref={ref}
      {...drag()}
      style={{
        ...style,
        touchAction: "none",
      }}
      data-vu="vellum"
      className="absolute"
    >
      {children}
    </animated.div>
  );
}
