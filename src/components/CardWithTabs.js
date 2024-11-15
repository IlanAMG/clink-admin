import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Tab } from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTab } from "../utils/hooks/useTab";
import styled from "styled-components";

const Buttons = styled.div`
  flex-grow: 1;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

export function CardWithTabs({ name, tabs, defaultTab }) {
  const userRole = JSON.parse(sessionStorage.getItem("user")).role;
  const initialTab = useTab(tabs);
  const [tab, setTab] = useState(defaultTab ?? initialTab);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    tabs: {
      "& .MuiButtonBase-root.MuiTab-root": {
        fontFamily: "sans-serif",
      },
    },
    tabPanel: {
      [theme.breakpoints.down("sm")]: {
        padding: 0 + "!important",
      },
    },
  }));
  const classes = useStyles();

  return (
    <>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px 15px 0 0",
          }}
        >
          <CardHeader title={name} />
          <Buttons>
            {tabs[tab]?.buttons?.map((button, index) => {
              return (
                <Button key={index} variant="outlined" onClick={button.action}>
                  {button.name}
                </Button>
              );
            })}
          </Buttons>
        </div>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              onChange={(e, value) => {
                setTab(value);
              }}
              className={classes.tabs}
            >
              {tabs?.map((aTab, index) => {
                if (aTab.roles && !aTab.roles.includes(userRole)) return null;
                return <Tab key={index} label={aTab.name} value={index} />;
              })}
            </TabList>
          </Box>
          <TabPanel className={classes.tabPanel} value={tab}>
            {tabs[tab]?.component}
          </TabPanel>
        </TabContext>
      </Card>
    </>
  );
}
