import { useEffect, useRef } from "react";

export const useLiveRef = (value) => {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref;
};
