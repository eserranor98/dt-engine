import { animated, to, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { Vellum } from "../App";
import { ContentSpring } from "../hooks/useGestureBindings";

interface Props {
  item: Vellum;
  index: number;
  contentSpring: ContentSpring;
  scaleWithContent?: boolean;
}

export const AnimatedItem = ({
  item,
  index,
  contentSpring,
  scaleWithContent,
}: Props) => {
  const [itemStyle, itemAPI] = useSpring(() => ({
    x: item.x,
    y: item.y,
    width: item.width,
    height: item.height,
  }));

  const drag = useDrag(
    ({ offset: [x, y], memo = contentSpring[0].scale.get(), event }) => {
      // Prevents dragging the container
      event.stopPropagation();

      const trueX = x / memo;
      const trueY = y / memo;

      itemAPI.start({ x: trueX, y: trueY, immediate: true });

      return memo;
    },
    {
      from: () => {
        const scale = contentSpring[0].scale.get();

        const trueX = itemStyle.x.get() * scale;
        const trueY = itemStyle.y.get() * scale;
        return [trueX, trueY];
      },
    }
  );

  const width = to(
    [contentSpring[0].scale, itemStyle.width],
    (scale, width) => {
      if (scaleWithContent) {
        return width * scale;
      }

      return width;
    }
  );
  const height = to(
    [contentSpring[0].scale, itemStyle.height],
    (scale, height) => {
      if (scaleWithContent) {
        return height * scale;
      }

      return height;
    }
  );

  const x = to([contentSpring[0].scale, itemStyle.x], (contentScale, itemX) => {
    return itemX * contentScale;
  });

  const y = to([contentSpring[0].scale, itemStyle.y], (contentScale, itemY) => {
    return itemY * contentScale;
  });

  console.log(`rendering vellum ${index}...`);

  return (
    <animated.div
      {...drag()}
      style={{
        x,
        y,
        width,
        height,
      }}
      className="bg-blue-400 absolute touch-none"
    />
  );
};
