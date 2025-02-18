import { RefObject, useEffect } from "react";

interface IFProps {
  ref: RefObject<HTMLDivElement | null>;
  handler: (size: { width: number; height: number }) => void;
}

const useResizeObserver = ({ ref, handler }: IFProps) => {
  useEffect(() => {
    if (!ref?.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        handler({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);
};

export default useResizeObserver;
