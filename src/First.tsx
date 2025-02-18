import { animated, useSpring } from "@react-spring/web";
import { useState } from "react";
import { Button } from "./components/ui/button";
import { Switch } from "./components/ui/switch";
import { ANIMATION_CONFIG } from "./engine/engine";
import { useGestureBindings } from "./hooks/useGestureBindings";

const contentM = {
  width: 602,
  height: 616,
};

const containerM = {
  width: 1600,
  height: 900,
};

const vellums = [
  { width: 50, height: 50, x: 10, y: 200 },
  { width: 50, height: 50, x: 250, y: 250 },
  { width: 30, height: 30, x: 100, y: 100 },
];

export type Vellum = (typeof vellums)[number];

export default function First() {
  const [animations, setAnimations] = useState(true);

  const [contentStyle, contentAPI] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    width: contentM.width,
    height: contentM.height,

    // Config for the spring animation
    config: ANIMATION_CONFIG,
  }));

  const onRecenter = () => {
    const x = containerM.width / 2 - contentStyle.width.get() / 2;
    const y = containerM.height / 2 - contentStyle.height.get() / 2;

    contentAPI.start({
      x,
      y,
      immediate: !animations,
    });
  };

  const onExtents = (padding: number = 0) => {
    const newScale = Math.min(
      (containerM.height - 2 * padding) / contentM.height,
      (containerM.width - 2 * padding) / contentM.width
    );

    const x = (containerM.width - contentM.width * newScale) / 2;
    const y = (containerM.height - contentM.height * newScale) / 2;

    contentAPI.start({
      x,
      y,
      scale: newScale,
      width: contentM.width * newScale,
      height: contentM.height * newScale,
      immediate: !animations,
    });
  };

  const onZoomIn = () => {
    const newScale = contentStyle.scale.get() + 0.1;

    const x = contentStyle.x.get() - (contentM.width * 0.1) / 2;
    const y = contentStyle.y.get() - (contentM.height * 0.1) / 2;

    contentAPI.start({
      scale: newScale,
      width: contentM.width * newScale,
      height: contentM.height * newScale,
      x,
      y,
      immediate: !animations,
    });
  };

  const onZoomOut = () => {
    const newScale = contentStyle.scale.get() - 0.1;

    const x = contentStyle.x.get() + (contentM.width * 0.1) / 2;
    const y = contentStyle.y.get() + (contentM.height * 0.1) / 2;

    contentAPI.start({
      scale: newScale,
      width: contentM.width * newScale,
      height: contentM.height * newScale,
      x,
      y,
      immediate: !animations,
    });
  };

  const bindings = useGestureBindings({
    contentSpring: [contentStyle, contentAPI],
    contentM,
  });

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as HTMLElement).id.startsWith("seg-")) {
      const target = e.target as HTMLElement;
      const rect = target.getBoundingClientRect();

      const parentRect = (
        e.currentTarget as HTMLElement
      ).getBoundingClientRect();

      const centerX =
        containerM.width / 2 - (rect.width * contentStyle.scale.get()) / 2;
      const centerY =
        containerM.height / 2 - (rect.height * contentStyle.scale.get()) / 2;

      const newX =
        contentStyle.x.get() +
        centerX -
        (rect.left - parentRect.left) * contentStyle.scale.get();
      const newY =
        contentStyle.y.get() +
        centerY -
        (rect.top - parentRect.top) * contentStyle.scale.get();

      contentAPI.start({
        x: newX,
        y: newY,
        immediate: !animations,
      });
    }
  };

  return (
    <div className="w-full h-screen relative flex flex-col p-2 gap-2">
      <div className="flex gap-3 items-center">
        <Button onClick={onRecenter}>Re-center</Button>
        <Button onClick={() => onExtents(20)}>Extents</Button>
        <Button onClick={onZoomIn}>Zoom-in</Button>
        <Button onClick={onZoomOut}>Zoom-out</Button>
        <div className="flex items-center gap-2">
          <span className="font-medium">Animations</span>{" "}
          <Switch
            defaultChecked={animations}
            onCheckedChange={(val) => setAnimations(val)}
          />
        </div>
      </div>
      <div className="flex items-center justify-center grow w-full">
        <div
          {...bindings}
          style={{
            width: containerM.width,
            height: containerM.height,
          }}
          className="bg-zinc-200 rounded overflow-hidden relative touch-none"
          onClick={onClick}
        >
          <animated.div
            id="animated-content"
            style={{
              x: contentStyle.x,
              y: contentStyle.y,
              width: contentStyle.width,
              height: contentStyle.height,
              transform: "translateZ(0)",
              willChange: "transform",
              contain: "size layout paint",
            }}
            className="absolute"
          >
            <img
              src="/assets/background_031323.svg"
              className="pointer-events-none"
              style={{
                imageRendering: "pixelated",
                transform: "translateZ(0)" /* Forces GPU acceleration */,
              }}
            />
          </animated.div>
        </div>
      </div>
    </div>
  );
}
