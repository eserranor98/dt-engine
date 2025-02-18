import { useEffect, useState } from "react";
import { IFAsset } from "./../../data";
import { AssetViewer } from "./AssetViewer";

export interface AssetMapperProps {
  dimensions: {
    width: number;
    height: number;
  };
  assets: IFAsset[];
  onReady?: () => void;
}
//
export const AssetMapper = ({
  dimensions,
  assets,
  onReady,
}: AssetMapperProps) => {
  const [processedAssets, setProcessedAssets] = useState<IFAsset[] | null>(
    null
  );

  useEffect(() => {
    processAssets(assets).then((processed) => {
      setProcessedAssets(processed);
      onReady && onReady();
    });
  }, []);

  return (
    <div
      className="relative w-full h-full"
      style={{
        ...(!processedAssets && {
          width: dimensions.width,
          height: dimensions.height,
        }),
      }}
    >
      {processedAssets &&
        processedAssets.map((asset) => (
          <AssetViewer key={asset.identifier} asset={asset} />
        ))}
    </div>
  );
};

async function processAssets(assets: IFAsset[]): Promise<IFAsset[]> {
  const processed: IFAsset[] = [];

  for (let i = 0; i < assets.length; i++) {
    const currAsset = assets[i];

    if (currAsset.mode === "img") {
      processed.push(currAsset);
    }

    if (currAsset.mode === "inline") {
      const res = await fetch(currAsset.url);
      const text = await res.text();

      processed.push({
        ...currAsset,
        url: text,
      });
    }
  }

  return processed;
}
