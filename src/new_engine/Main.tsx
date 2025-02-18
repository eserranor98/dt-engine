import { siteAssets } from "./../../data";
import { DTEntry } from "./DTEntry";
import { useDTConfig } from "./useDTConfig";

export const Main = () => {
  const config = useDTConfig((s) => s.config);

  return (
    <div className="w-full h-screen flex flex-col grow">
      <DTEntry
        contentProps={{
          assets: siteAssets,
          dimensions: {
            width: 602,
            height: 616,
          },
        }}
        config={config}
      />
    </div>
  );
};
