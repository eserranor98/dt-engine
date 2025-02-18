import { useSpring } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";
import { AssetMapper, AssetMapperProps } from "./AssetMapper";
import { DevTools } from "./DevTools";
import { DTContainer } from "./DTContainer";
import { DTContent } from "./DTContent";
import { IFDTEngineConfig, useDTEngine } from "./useDtEngine";
import useResizeObserver from "./useResizeObserver";
import { useDTReady } from "./useDTReady";

interface IFProps {
  contentProps: Omit<AssetMapperProps, "onReady">;
  config?: IFDTEngineConfig;
}

export const DTEntry = ({ contentProps, config }: IFProps) => {
  const { isReady, setContentReady, setContainerReady } = useDTReady();

  const [container, setContainer] = useState({
    width: 0,
    height: 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const [contentStyle, contentApi] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    width: contentProps.dimensions.width,
    height: contentProps.dimensions.height,

    // Config for the spring animation
    // config: ANIMATION_CONFIG, TODO: ANIMATION_CONFIG
  }));

  const dtActions = useDTEngine({
    contentSpring: [contentStyle, contentApi],
    containerStyle: container,
    contentM: contentProps.dimensions,
    config,
    isReady,
  });

  useResizeObserver({
    ref: containerRef,
    handler: (size) => {
      setContainer(size);
    },
  });

  return (
    <div
      ref={containerRef}
      className="flex flex-col w-full h-full grow relative"
      // We want to hide everything until the engine is ready
      style={{
        ...(!isReady && { opacity: 0 }),
      }}
    >
      <DevTools actions={dtActions} />
      <DTContainer
        onReady={() => setContainerReady(true)}
        contentSpring={[contentStyle, contentApi]}
        contentM={contentProps.dimensions}
      >
        <DTContent contentSpring={contentStyle}>
          <AssetMapper
            onReady={() => setContentReady(true)}
            assets={contentProps.assets}
            dimensions={contentProps.dimensions}
          />
        </DTContent>
      </DTContainer>
    </div>
  );
};
