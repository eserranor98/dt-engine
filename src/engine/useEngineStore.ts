import { create } from "zustand";
import { IFEngineState, zoomIn, zoomOut, zoomToRect } from "./engine";

interface IFState {
  engineState: IFEngineState;

  contentRect: DOMRect | null;
  containerRect: DOMRect | null;

  disableAnimations: boolean;
}

interface IFActions {
  setContentRect: (rect: DOMRect) => void;
  setContainerRect: (rect: DOMRect) => void;

  setEngineState: (state: IFEngineState) => void;
  setDisableAnimations: (disableAnimations: boolean) => void;
}

interface IFMutations {
  zoomIn: () => void;
  zoomOut: () => void;
  reCenter: () => void;
  zoomToExtents: () => void;
}

export const useEngineStore = create<IFState & IFActions & IFMutations>(
  (set) => ({
    // State
    engineState: {
      scale: 1,
      x: 0,
      y: 0,
    },

    contentRect: null,
    containerRect: null,
    disableAnimations: false,

    // Actions
    setContentRect: (contentRect) =>
      set((state) => {
        const delta = zoomToRect(
          state.containerRect,
          contentRect,
          state.engineState.scale,
          false
        );

        return {
          contentRect,
          engineState: delta,
        };
      }),
    setContainerRect: (containerRect) => set({ containerRect }),
    setEngineState: (state) => set({ engineState: state }),
    setDisableAnimations: (disableAnimations) => set({ disableAnimations }),

    // Mutations

    zoomIn: () => {
      set((state) => {
        const delta = zoomIn(state.engineState, state.contentRect);
        return {
          engineState: delta,
        };
      });
    },

    zoomOut: () => {
      set((state) => {
        const delta = zoomOut(state.engineState, state.contentRect);
        return {
          engineState: delta,
        };
      });
    },

    reCenter: () => {
      set((state) => {
        const delta = zoomToRect(
          state.containerRect,
          state.contentRect,
          0,
          false,
          state.engineState.scale
        );

        return {
          engineState: delta,
        };
      });
    },

    zoomToExtents: () => {
      set((state) => {
        const delta = zoomToRect(
          state.containerRect,
          state.contentRect,
          30,
          true
        );

        return {
          engineState: delta,
        };
      });
    },
  })
);
