import * as React from "react";
import { useEffect, useState } from "react";
import CardHeader from "@mui/material/CardHeader";
import { MDBDataTable } from "mdbreact";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { whitelabelListSelector } from "../../../../store/Whitelabel/WhitelabelList";
import { usersListSelector } from "../../../../store/Users/UsersList";
import { formatDate } from "../../../../utils/date";
import { redirectToProfileOrCard } from "../../../../utils/util";
import ModaleUserAction from "../../../../components/ModaleUser/ModaleUserAction";
import { fetchUsersList } from "../../../../store/Users/UsersList/features";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import ModalSecondaryProfils from "../../../../components/ModalSecondaryProfils/ModalSecondaryProfils";

const useStyle = (theme) => ({
  cardHeader: {
    textDecorationColor: "whiter",
    backgroundColor: "#96CED5",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(6, 210, 235, .3)",
  },
});
const BulleInfoProfiles = styled.div`
  border: 1px solid rgba(155, 155, 155, 0.4);
  border-radius: 50px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(187, 194, 201, 0.2);
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
export default function UsersList() {
  const { usersList, isLoading } = useSelector(usersListSelector);
  const { selectedWhiteLabel, whiteLabelList } = useSelector(
    whitelabelListSelector
  );
  const [dataTable, setDataTable] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [secondaryProfils, setSecondaryProfils] = useState(null);
  const classes = useStyle();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading) fetchData();
  }, [isLoading, usersList]);

  useEffect(() => {
    fetchData();
  }, [selectedWhiteLabel]);

  useEffect(() => {
    if (refetch) {
      dispatch(fetchUsersList());
      setRefetch(false);
      setSelectedUser(null);
    }
  }, [refetch, dispatch]);

  useEffect(() => {
    if (refetch) {
      dispatch(fetchUsersList());
      setRefetch(false);
      setSelectedUser(null);
    }
  }, [refetch, dispatch]);
  console.log("usersList", usersList);
  const fetchData = async () => {
    let columns = [
      {
        label: (
          <div style={{ cursor: "pointer", fontWeight: "bold" }}>Photo</div>
        ),
        field: "photo",
      },
      {
        label: (
          <div style={{ cursor: "pointer", fontWeight: "bold" }}>
            First name
          </div>
        ),
        field: "first_name",
      },
      {
        label: (
          <div style={{ cursor: "pointer", fontWeight: "bold" }}>Last name</div>
        ),
        field: "last_name",
      },
      {
        label: (
          <div style={{ cursor: "pointer", fontWeight: "bold" }}>
            Business name
          </div>
        ),
        field: "business_name",
      },
      {
        label: (
          <div style={{ cursor: "pointer", fontWeight: "bold" }}>Email</div>
        ),
        field: "email",
      },
      {
        label: (
          <div style={{ cursor: "pointer", fontWeight: "bold" }}>
            Created at
          </div>
        ),
        field: "created_at",
      },
      {
        label: (
          <div style={{ cursor: "pointer", fontWeight: "bold" }}>
            Whitelabel
          </div>
        ),
        field: "whitelabel",
      },
      {
        label: (
          <div style={{ cursor: "pointer", fontWeight: "bold" }}>Profiles</div>
        ),
        field: "profiles",
      },
      {
        label: (
          <div style={{ cursor: "pointer", fontWeight: "bold" }}>Actions</div>
        ),
        field: "action",
      },
    ];
    let rows = [];
    if (usersList && usersList.length > 0) {
      usersList
        .filter((x) => {
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
        .map((item) => {
          const firstName = item.firstName;
          const lastName = item.lastName;

          rows.push({
            photo: item.photoURL ? (
              <div
                style={{
                  borderRadius: 50,
                  height: 50,
                  width: 50,
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={item.photoURL} width={"auto"} height={50} />
              </div>
            ) : (
              <img src={"/avatar.svg"} width={50} height={50} />
            ),
            first_name: firstName,
            last_name: lastName,
            business_name: item.businessName,
            email: item.email,
            created_at: formatDate(item.createdAt),
            whitelabel: item.whiteLabel,
            profiles: item.profiles.length ? (
              <BulleInfoProfiles
                onClick={(e) => {
                  e.stopPropagation();
                  setSecondaryProfils(item.profiles);
                }}
              >
                {item.profiles.length}
              </BulleInfoProfiles>
            ) : null,
            action: (
              <Button
                varian={"contained"}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedUser(item);
                }}
              >
                Actions
              </Button>
            ),
            clickEvent: () => {
              redirectToProfileOrCard(item, whiteLabelList);
            },
          });
        });
    }
    setDataTable({ columns, rows });
  };

  if (isLoading || refetch) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <Card>
        <CardHeader className={classes.cardHeader} title={"Users"} />
        <CardContent>
          <MDBDataTable
            striped
            entriesOptions={[10, 20, 50]}
            entries={10}
            noBottomColumns
            infoLabel={["", "-", "sur", "résultats"]}
            sortable
            searching
            paging={dataTable && dataTable.rows && dataTable.rows.length > 0}
            paginationLabel={[
              <div style={{ cursor: "pointer" }}>Précédent</div>,
              <div style={{ cursor: "pointer" }}>Suivant</div>,
            ]}
            searchLabel={"Recherche"}
            noRecordsFoundLabel={"aucun enregistrement correspondant trouvé"}
            info={true}
            entriesLabel={"Afficher les résultats"}
            data={dataTable}
          />
        </CardContent>
      </Card>
      <ModaleUserAction
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        refetch={() => setRefetch(true)}
      />
      <ModalSecondaryProfils
        allSecondaryProfils={secondaryProfils}
        setSecondaryProfils={setSecondaryProfils}
        setSelectedUser={setSelectedUser}
      />
    </React.Fragment>
  );
}
