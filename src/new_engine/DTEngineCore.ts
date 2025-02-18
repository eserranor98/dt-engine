import { IFContentSpring } from "./useDTEngine";

interface IFDimensions {
  width: number;
  height: number;
}

export type IFContentStyle = {
  [K in keyof IFContentSpring[0]]: number;
};

export const DTEngineCore = {
  zoomIn: (
    contentStyle: IFContentStyle,
    contentM: IFDimensions,
    amount?: number
  ) => {
    const zoomFactor = 1 + (amount ?? 0.1); // Default to 10% increase

    const newScale = contentStyle.scale * zoomFactor; // Multiply instead of add

    const x = contentStyle.x - (contentM.width * (zoomFactor - 1)) / 2;
    const y = contentStyle.y - (contentM.height * (zoomFactor - 1)) / 2;

    return {
      scale: newScale,
      width: contentM.width * newScale,
      height: contentM.height * newScale,
      x,
      y,
    };
  },
  zoomOut: (
    contentStyle: IFContentStyle,
    contentM: IFDimensions,
    amount?: number
  ) => {
    const zoomFactor = 1 / (1 + (amount ?? 0.1)); // Inverse of zoom-in

    const newScale = contentStyle.scale * zoomFactor; // Multiply instead of subtract

    const x = contentStyle.x + (contentM.width * (1 - zoomFactor)) / 2;
    const y = contentStyle.y + (contentM.height * (1 - zoomFactor)) / 2;

    return {
      scale: newScale,
      width: contentM.width * newScale,
      height: contentM.height * newScale,
      x,
      y,
    };
  },
  recenter: (contentStyle: IFContentStyle, containerM: IFDimensions) => {
    const x = containerM.width / 2 - contentStyle.width / 2;
    const y = containerM.height / 2 - contentStyle.height / 2;

    return {
      x,
      y,
    };
  },
  extents: (
    contentM: IFDimensions,
    containerM: IFDimensions,
    padding: number = 0
  ) => {
    const newScale = Math.min(
      (containerM.height - 2 * padding) / contentM.height,
      (containerM.width - 2 * padding) / contentM.width
    );

    const x = (containerM.width - contentM.width * newScale) / 2;
    const y = (containerM.height - contentM.height * newScale) / 2;

    return {
      scale: newScale,
      width: contentM.width * newScale,
      height: contentM.height * newScale,
      x,
      y,
    };
  },
};
