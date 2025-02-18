/**
 * This hook is responsible for handling the drag and zoom gestures.
 * It uses the useDrag hook from the @use-gesture/react library to handle the drag gesture.
 */

import { SpringRef, SpringValue } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

export type ContentSpring = [
  {
    x: SpringValue<number>;
    y: SpringValue<number>;
    scale: SpringValue<number>;
    width: SpringValue<number>;
    height: SpringValue<number>;
  },
  SpringRef<{
    x: number;
    y: number;
    scale: number;
    width: number;
    height: number;
  }>
];

interface IGestureBindings {
  contentSpring: ContentSpring;

  contentM: {
    width: number;
    height: number;
  };
}

export function useGestureBindings({
  contentSpring,
  contentM,
}: IGestureBindings) {
  const drag = useDrag(
    ({ offset: [x, y], memo = contentSpring[0].scale.get() }) => {
      contentSpring[1].start({
        x,
        y,
        scale: memo,
        immediate: true,
      });

      return memo;
    },
    {
      from: () => [contentSpring[0].x.get(), contentSpring[0].y.get()],
    }
  );

  const handleWheel = (event: React.WheelEvent) => {
    const scale = Math.max(
      0.5,
      contentSpring[0].scale.get() + event.deltaY * -0.01
    );

    const x =
      contentSpring[0].x.get() +
      ((contentSpring[0].scale.get() - scale) * contentM.width) / 2;
    const y =
      contentSpring[0].y.get() +
      ((contentSpring[0].scale.get() - scale) * contentM.height) / 2;

    contentSpring[1].start({
      x,
      y,
      scale,
      width: contentM.width * scale,
      height: contentM.height * scale,
      immediate: true,
    });
  };

  const bindings = {
    ...drag(),
    onWheel: handleWheel,
  };

  return bindings;
}
