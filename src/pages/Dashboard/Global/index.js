import * as React from "react";
import { useEffect, useState } from "react";
import CardHeader from "@mui/material/CardHeader";
// import { MDBDataTable } from "mdbreact";
// import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
// import { deleteUser } from "../../../store/Users/UsersList";
// import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { whitelabelListSelector } from "../../../store/Whitelabel/WhitelabelList";
import { usersListSelector } from "../../../store/Users/UsersList";
import { Global } from "../../../Panel/Global";
import { linksSelector } from "../../../store/Links";
// import { ordersListSelector } from "../../../store/Orders/OrderList";
import { useCallback } from "react";

export default function Users() {
  const { links } = useSelector(linksSelector);
  const { usersList } = useSelector(usersListSelector);
  // const { ordersList } = useSelector(ordersListSelector);
  const [filteredUsers, setFilteredUsers] = useState(usersList);
  // const [filteredOrders, setFilteredOrders] = useState(ordersList);
  const [filteredLinks, setFilteredLinks] = useState(links);

  const { whiteLabelList, selectedWhiteLabel } = useSelector(
    whitelabelListSelector
  );

  const filterData = useCallback(
    (list, action) => {
      action(
        list.filter((x) => {
          if (!selectedWhiteLabel || selectedWhiteLabel === "All whitelabels") {
            return true;
          }
          if (!x.whiteLabel) {
            return false;
          }
          return (
            selectedWhiteLabel.toLowerCase() === x.whiteLabel.toLowerCase()
          );
        })
      );
    },
    [selectedWhiteLabel]
  );

  useEffect(() => {
    filterData(usersList, setFilteredUsers);
    // filterData(
    //   ordersList.map((x) => ({ ...x, whiteLabel: x.whitelabel })),
    //   setFilteredOrders
    // );
    filterData(
      links.map((link) => ({ ...link, whiteLabel: link.whitelabel })),
      setFilteredLinks
    );
  }, [selectedWhiteLabel, usersList, links, filterData]);

  return (
    <React.Fragment>
      <Card>
        <CardHeader title={"Global"} />
        <Global>
          <span>
            <small>TOTAL USERS: </small>
            {filteredUsers.length}
          </span>
          <span>
            <small>TOTAL WHITELABELS : </small>
            {whiteLabelList.length}
          </span>
          <span>
            <small>TOTAL LINKS NOT USED : </small>
            {filteredLinks.filter((link) => !link.isUsed).length}
          </span>
          <span>
            {/* <small>TOTAL ORDERS : </small>
            {filteredOrders.length} */}
          </span>
        </Global>
      </Card>
    </React.Fragment>
  );
}
