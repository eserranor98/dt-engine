import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExpandIcon, LocateIcon, MinusIcon, PlusIcon } from "lucide-react";
import { IFDTActions } from "./useDTEngine";
import { useDTConfig } from "./useDTConfig";

interface IFProps {
  actions: IFDTActions;
}

export const DevTools = ({ actions }: IFProps) => {
  const config = useDTConfig();

  return (
    <div className="flex flex-col z-10 bg-blue-500 p-4 rounded-lg gap-2 justify-center absolute top-2 left-2">
      <Button variant="default" onClick={() => actions.recenter()}>
        <LocateIcon />
        Recenter
      </Button>
      <div className="flex gap-2">
        <Button
          variant="default"
          className="grow"
          onClick={() => actions.extents()}
        >
          <ExpandIcon />
          Extents
        </Button>
        <Input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Padding"
          className="w-28 bg-background"
          onChange={(e) =>
            config.updateConfig({ extentsPadding: Number(e.target.value) })
          }
        />
      </div>
      <div className="flex gap-2">
        <Button
          variant="default"
          className="grow"
          onClick={() => actions.zoomIn()}
        >
          <PlusIcon />
          Zoom In
        </Button>
        <Input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Amount"
          className="w-28 bg-background"
          onChange={(e) =>
            config.updateConfig({ zoomInAmount: Number(e.target.value) })
          }
        />
      </div>
      <div className="flex gap-2">
        <Button
          variant="default"
          className="grow"
          onClick={() => actions.zoomOut()}
        >
          <MinusIcon />
          Zoom Out
        </Button>
        <Input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Amount"
          className="w-28 bg-background"
          onChange={(e) =>
            config.updateConfig({ zoomOutAmount: Number(e.target.value) })
          }
        />
      </div>
    </div>
  );
};
