import * as React from "react";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import navbarList from "./navList";

const drawerWidthOpen = 240;
const paddingIconButton = 10;
const marginIconButton = 14;
const iconFontSize = 20;
const drawerWidthClose =
  (paddingIconButton + marginIconButton) * 2 + iconFontSize;

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const userRole = JSON.parse(sessionStorage.getItem("user"))?.role;

  let navigate = useNavigate();
  const theme = useTheme();
  function toogleOpen() {
    setOpen(!open);
  }

  return (
    <>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open
            ? { xs: "0px", sm: drawerWidthClose }
            : { xs: drawerWidthClose, sm: drawerWidthOpen },
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: open
              ? theme.transitions.duration.leavingScreen
              : theme.transitions.duration.enteringScreen,
          }),
          "& .MuiDrawer-paper": {
            overflowX: "hidden",
            width: open
              ? { xs: "0px", sm: drawerWidthClose }
              : { xs: drawerWidthClose, sm: drawerWidthOpen },
            borderRight: "0px",
            boxShadow: theme.shadows[8],
            backgroundColor: open ? "#46516D" : "#46516D",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: open
                ? theme.transitions.duration.leavingScreen
                : theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            height: "42px",
            width: "auto",
            backgroundColor: "transparent",
            margin: "14px 14px",
            padding: "12px 0px",
            borderBottom: "1px solid #E2E8F0",
            alignItems: "flex-end",
          }}
        >
          <Typography
            variant="h1"
            noWrap={true}
            gutterBottom
            sx={{
              display: { xs: "none", sm: "initial" },
              fontSize: "18px",
              fontWeight: 600,
              color: "#E2E8F0",
              width: "154px",
              marginLeft: open ? "0px" : "8px",
              paddingBottom: "3px",
            }}
          >
            CLINK
          </Typography>

          <Button
            onClick={toogleOpen}
            sx={{
              minWidth: "initial",
              padding: "10px",
              color: "gray",
              borderRadius: "8px",
              backgroundColor: open ? "transparent" : "transparent",
              "&:hover": {
                backgroundColor: "#26284687",
              },
            }}
          >
            <MenuIcon
              sx={{ fontSize: "20px", color: open ? "#E2E8F0" : "#E2E8F0" }}
            ></MenuIcon>
          </Button>
        </Box>

        <List style={{ height: "80%" }}>
          {navbarList.map((tab, index) => {
            if (!tab.roles.includes(userRole)) return null;
            return (
              <Link to={tab.link}>
                <Tooltip
                  title={open ? tab.desc : ""}
                  placement={"right"}
                  componentsProps={{
                    tooltip: {
                      sx: {
                        backgroundColor: "gray",
                        color: "white",
                        marginLeft: "22px !important",
                        boxShadow: "0px 0px 22px -2px rgba(0,0,0,0.20)",
                      },
                    },
                  }}
                >
                  <ListItemButton
                    sx={{
                      margin: "6px 14px",
                      padding: "10px",
                      borderRadius: "8px",
                      "&:hover": {
                        backgroundColor: "#26284687",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: "46px" }}>
                      <tab.icon sx={{ fontSize: "20px", color: "#E2E8F0" }} />
                    </ListItemIcon>

                    <ListItemText
                      primary={tab.desc}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                      sx={{
                        display: "inline",
                        margin: "0px",
                        overflowX: "hidden",
                        color: "#E2E8F0",
                        whiteSpace: "nowrap",
                        minWidth: "126px",
                      }}
                    />
                  </ListItemButton>
                </Tooltip>
              </Link>
            );
          })}
          <Divider variant="middle" light={true} />
        </List>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            alignContents: "center",
            margin: "14px 14px",
            padding: "12px 4px",
            borderTop: "1px solid #E2E8F0",
          }}
        >
          <IconButton
            contained
            sx={{ color: "#E2E8F0" }}
            onClick={() => {
              window.sessionStorage.removeItem("user");
              navigate("/");
            }}
          >
            <ExitToAppIcon />
          </IconButton>
        </Box>
      </Drawer>
    </>
  );
}
