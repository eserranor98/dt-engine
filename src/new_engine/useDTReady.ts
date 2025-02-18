import { useState } from "react";

export function useDTReady() {
  const [contentReady, setContentReady] = useState(false);
  const [containerReady, setContainerReady] = useState(false);

  return {
    isReady: contentReady && containerReady,
    setContentReady,
    setContainerReady,
  };
}
