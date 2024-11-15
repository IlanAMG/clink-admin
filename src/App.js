import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Dashboard/Users";
import Global from "./pages/Dashboard/Global";
import Links from "./pages/Dashboard/Links";
import WhiteLabels from "./pages/Dashboard/WhiteLabels";
import WhiteLabel from "./pages/Dashboard/WhiteLabels/WhiteLabel";

export default function App() {
  let navigate = useNavigate();
  const userRole = JSON.parse(sessionStorage.getItem("user"))?.role;

  useEffect(() => {
    (async () => {
      let data = JSON.parse(window.sessionStorage.getItem("user"));
      if (data) {
        if (data.role === "admin") navigate("dashboard/global");
        if (data.role === "vendor" || data.role === "taxi")
          navigate("dashboard/taxis");
        if (data.role === "sponsor") navigate("dashboard/taxis?tab=modules");
      }
    })();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />}>
        {userRole === "admin" && (
          <>
            <Route path="whitelabels" element={<WhiteLabels />} />
            <Route path="whitelabels/:id" element={<WhiteLabel />} />
            <Route path="users" element={<Users />} />
            <Route path="global" element={<Global />} />
            <Route path="links" element={<Links />} />
          </>
        )}
      </Route>
    </Routes>
  );
}
