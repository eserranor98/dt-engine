import { IFAsset } from "./../../data";

interface IFAssetViewerProps {
  asset: IFAsset;
}

export const AssetViewer = ({ asset }: IFAssetViewerProps) => {
  if (asset.mode === "img") {
    return (
      <img
        className="w-full h-full absolute top-0 left-0"
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
        }}
        src={asset.url}
      />
    );
  } else if (asset.mode === "inline") {
    return (
      <div
        className="w-full h-full absolute top-0 left-0"
        dangerouslySetInnerHTML={{ __html: asset.url }}
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      ></div>
    );
  }
};
