import { animated, useSpring } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { useState } from "react";

interface IFProps {
  src: string;
}

const PanZoomSVG = ({ src }: IFProps) => {
  const [scale, setScale] = useState(1);

  // Spring animation for x, y, and scale
  const [{ x, y, zoom }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    zoom: 1,
    config: { mass: 1, tension: 200, friction: 30 }, // Less tension for stability
  }));

  // Gesture handling for panning and zooming
  const bind = useGesture({
    onDrag: ({ offset: [dx, dy], event }) => {
      event.preventDefault();
      api.start({ x: dx, y: dy });
    },
    onPinch: ({ offset: [d] }) => {
      const newScale = Math.min(Math.max(1, d / 100 + 1), 5); // Clamp scale between 1 and 5
      setScale(newScale);
      api.start({ zoom: newScale });
    },
    onWheel: ({ event }) => {
      event.preventDefault();
      api.start({
        zoom: zoom.get() * (event.deltaY > 0 ? 0.95 : 1.05), // Gradual zoom changes
        immediate: false, // Ensures smooth transitions
      });
    },
  });

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      <animated.div
        {...bind()}
        style={{
          x,
          y,
          scale: zoom,
          touchAction: "none",
          transformOrigin: "center center",
        }}
        className="absolute w-full h-full flex items-center justify-center"
      >
        <img
          src={src}
          className="pointer-events-none max-w-none"
          style={{
            imageRendering: "crisp-edges",
            transform: "translateZ(0)" /* Forces GPU acceleration */,
          }}
        />
      </animated.div>
    </div>
  );
};

export default PanZoomSVG;
