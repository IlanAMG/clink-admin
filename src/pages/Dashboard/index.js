import * as React from "react";
import { useEffect } from "react";
import { fetchWhitelabelList } from "../../store/Whitelabel/WhitelabelList/features";
import NavMenu from "../../components/NavMenu/NavMenu";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersList } from "../../store/Users/UsersList/features";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import {
  updateSelectedWhiteLabel,
  whitelabelListSelector,
} from "../../store/Whitelabel/WhitelabelList";
import { useLocation } from "react-router-dom";
import { fetchRequests } from "../../store/Requests/features";
import { fetchLinks } from "../../store/Links/features";
import { WhitelabelSelection } from "../../components/WhitelabelSelection";
export default function Dashboard() {
  const { pathname } = useLocation();
  const display = !pathname.includes("requests");
  const { selectedWhiteLabel } = useSelector(whitelabelListSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWhitelabelList());
    dispatch(fetchUsersList());
    dispatch(fetchRequests());
    dispatch(fetchLinks());
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex" }}>
      <NavMenu />
      <Box
        component="main"
        sx={{
          padding: "8px",
          margin: "6px 14px",
          width: 1,
        }}
      >
        {display && (
          <Box
            sx={{
              maxHeight: 250,
              marginBottom: 1,
            }}
          >
            <FormControl>
              <WhitelabelSelection
                value={selectedWhiteLabel}
                onChange={(newValue) =>
                  dispatch(updateSelectedWhiteLabel(newValue))
                }
                disableAll={false}
              />
            </FormControl>
          </Box>
        )}
        <Outlet />
      </Box>
    </Box>
  );
}
