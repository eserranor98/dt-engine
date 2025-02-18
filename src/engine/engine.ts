import { SpringConfig } from "@react-spring/web";

export interface IFEngineState {
  x: number;
  y: number;
  scale: number;
}

export function zoomToRect(
  container: DOMRect | null,
  rect: DOMRect | null,
  padding: number = 0,
  fitBounds: boolean = true,
  scale: number = 1
): IFEngineState {
  if (!container || !rect) {
    return {
      x: 0,
      y: 0,
      scale: 1,
    };
  }

  // Only adjust the scale if fitBounds is true
  const newScale = fitBounds
    ? Math.min(
        (container.width - 2 * padding) / rect.width,
        (container.height - 2 * padding) / rect.height
      )
    : scale;

  const x = (container.width - rect.width * newScale) / 2;
  const y = (container.height - rect.height * newScale) / 2;

  return {
    x,
    y,
    scale: newScale,
  };
}

export function zoomIn(
  state: IFEngineState,
  rect: { width: number; height: number } | null
): IFEngineState {
  const newScale = state.scale + 0.1;

  if (!rect) {
    return {
      ...state,
      scale: newScale,
    };
  }

  const prevWidth = state.scale * rect.width;
  const prevHeight = state.scale * rect.height;

  const x = state.x - (prevWidth * 0.1) / 2;
  const y = state.y - (prevHeight * 0.1) / 2;

  return {
    x,
    y,
    scale: newScale,
  };
}

export function zoomOut(
  state: IFEngineState,
  rect: DOMRect | null
): IFEngineState {
  const newScale = state.scale - 0.1;

  if (!rect) {
    return {
      ...state,
      scale: newScale,
    };
  }

  const x = state.x + (rect.width * 0.1) / 2;
  const y = state.y + (rect.height * 0.1) / 2;

  return {
    x,
    y,
    scale: newScale,
  };
}

export function setZoom(
  state: IFEngineState,
  scale: number,
  rect: DOMRect | null
): IFEngineState {
  if (!rect) {
    return {
      ...state,
      scale,
    };
  }

  const x = state.x + ((state.scale - scale) * rect.width) / 2;
  const y = state.y + ((state.scale - scale) * rect.height) / 2;

  return {
    x,
    y,
    scale,
  };
}

export const ANIMATION_CONFIG: SpringConfig = {
  tension: 120,
  friction: 14,
  bounce: 0,
  precision: 0.1,
};

export const NO_ANIMATION_CONFIG = { mass: 1, tension: 0, friction: 0 };
