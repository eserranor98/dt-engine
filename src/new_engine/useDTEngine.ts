import { SpringRef, SpringValue } from "@react-spring/web";
import { useEffect } from "react";
import { DTEngineCore, IFContentStyle } from "./DTEngineCore";

export type IFContentSpring = [
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

interface IFProps {
  contentSpring: IFContentSpring;
  contentM: {
    width: number;
    height: number;
  };
  containerStyle: {
    height: number;
    width: number;
  };
  config?: IFDTEngineConfig;
  isReady: boolean;
}

export interface IFDTEngineConfig {
  zoomInAmount?: number;
  zoomOutAmount?: number;
  extentsPadding?: number;

  centerOnStart?: boolean;
}

export type IFDTActions = {
  [K in keyof typeof DTEngineCore]: (immediate?: boolean) => void;
};

export function useDTEngine({
  contentSpring,
  contentM,
  containerStyle,
  config,
  isReady,
}: IFProps) {
  const [contentStyle, contentAPI] = contentSpring;

  const actions: IFDTActions = {
    zoomIn: () => {
      const styles = getContentStyles(contentStyle);
      const delta = DTEngineCore.zoomIn(styles, contentM, config?.zoomInAmount);
      contentAPI.start(delta);
    },
    zoomOut: () => {
      const styles = getContentStyles(contentStyle);
      const delta = DTEngineCore.zoomOut(
        styles,
        contentM,
        config?.zoomOutAmount
      );
      contentAPI.start(delta);
    },
    recenter: (immediate?: boolean) => {
      const styles = getContentStyles(contentStyle);
      const delta = DTEngineCore.recenter(styles, containerStyle);
      contentAPI.start({ ...delta, immediate });
    },
    extents: () => {
      const styles = getContentStyles(contentStyle);
      const delta = DTEngineCore.extents(
        styles,
        containerStyle,
        config?.extentsPadding
      );
      contentAPI.start(delta);
    },
  };

  /**
   * Handles the initial centering of the content
   * and the recentering when the container changes
   * size.
   */
  useEffect(() => {
    if (isReady) {
      actions.recenter(true);
    }
  }, [isReady, containerStyle]);

  return actions;
}

function getContentStyles(styleSpring: IFContentSpring[0]): IFContentStyle {
  return {
    height: styleSpring.height.get(),
    scale: styleSpring.scale.get(),
    width: styleSpring.width.get(),
    x: styleSpring.x.get(),
    y: styleSpring.y.get(),
  };
}
