import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useTab = (tabs) => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const [index] = useState(
    tabs.findIndex(({ name }) => name.toLowerCase() === tab)
  );
  return tab ? index : 0;
};
