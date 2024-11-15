import { useState, useEffect } from "react";
import { format } from "date-fns";

const getLastOnline = (lastOnline) => {
  if (!lastOnline) return "Never";
  if (Date.now() - parseInt(lastOnline) < 70000) return "Now";
  return format(lastOnline, "MM/dd/yyyy HH:mm");
};

export const LastOnline = ({ lastOnline }) => {
  const [formatedLastOnline, setFormatedLastOnline] = useState(
    getLastOnline(lastOnline)
  );
  const [refreshInterval, setRefreshInterval] = useState();
  useEffect(() => {
    setFormatedLastOnline(getLastOnline(lastOnline));
    clearInterval(refreshInterval);
    setRefreshInterval(
      setInterval(() => setFormatedLastOnline(getLastOnline(lastOnline)), 30000)
    );
    return () => clearInterval(refreshInterval);
  }, [lastOnline]);
  return <p style={{ fontWeight: "normal" }}>{formatedLastOnline}</p>;
};
