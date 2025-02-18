import { create } from "zustand";
import { IFDTEngineConfig } from "./useDTEngine";

interface IFState {
  config: IFDTEngineConfig;
}

interface IFActions {
  updateConfig: (config: Partial<IFDTEngineConfig>) => void;
}

export const useDTConfig = create<IFState & IFActions>((set) => ({
  config: {},
  updateConfig: (updatedConfig) =>
    set((current) => ({ config: { ...current.config, ...updatedConfig } })),
}));
