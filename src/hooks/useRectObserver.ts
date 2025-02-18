import { RefObject, useEffect } from "react";

interface IFProps {
  setRect: (rect: DOMRect) => void;
  ref: RefObject<HTMLDivElement>;
}

export function useRectObserver({ setRect, ref }: IFProps) {
  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setRect(ref.current.getBoundingClientRect());
      }
    };

    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref.current]);
}
