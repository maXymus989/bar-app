import { useState, useCallback } from "react";

const useBoundedIndex = (min = 0, initialMax = 0, initialIndex = 0) => {
  const [index, setIndex] = useState(initialIndex);
  const [max, setMax] = useState(initialMax);

  const next = useCallback(() => {
    setIndex((prev) => Math.min(prev + 1, max));
  }, [max]);

  const prev = useCallback(() => {
    setIndex((prev) => Math.max(prev - 1, min));
  }, [min]);

  return { index, next, prev, setMax };
};

export default useBoundedIndex;
