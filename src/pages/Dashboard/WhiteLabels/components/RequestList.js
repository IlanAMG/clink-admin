import * as React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import CardHeader from "@mui/material/CardHeader";
import { MDBDataTable } from "mdbreact";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { useDispatch, useSelector } from "react-redux";
import { requestsSelector } from "../../../../store/Requests";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import { formatDate } from "../../../../utils/date";
import { Modale } from "../../../../components/Modale";
import {
  acceptWhitelabelRequest,
  refuseWhitelabelRequest,
} from "../../../../modules/requests";
import { fetchRequests } from "../../../../store/Requests/features";
import { fetchWhitelabelList } from "../../../../store/Whitelabel/WhitelabelList/features";
import { Status } from "../../../../components/Status";

const getStatus = status => {
  if (status === "completed") return "accepted";
  return status;
};

const BlocColor = styled.div`
  background: ${({ color }) => color};
  border-radius: 8px;
  height: 36px;
  width: 36px;
  margin-right: 8px;
  box-shadow: 0px 4px 12px rgba(180, 180, 180, 0.3);
`;

const useStyle = theme => ({
  cardHeader: {
    textDecorationColor: "whiter",
    backgroundColor: "#96CED5",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(6, 210, 235, .3)",
  },
});
export default function RequestsList() {
  const { requests, isLoading } = useSelector(requestsSelector);
  const [dataTable, setDataTable] = useState([]);
  const [selectedSlug, setselectedSlug] = useState(null);
  const [refetch, setRefetch] = useState(false);

  const classes = useStyle();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading) fetchData();
  }, [isLoading]);

  useEffect(() => {
    if (refetch) {
      dispatch(fetchRequests());
      dispatch(fetchWhitelabelList());
      setRefetch(false);
      setselectedSlug(null);
    }
  }, [refetch, dispatch]);

  const fetchData = async () => {
    let columns = [
      {
        label: (
          <div style={{ cursor: "pointer", fontWeight: "bold" }}>Logo</div>
        ),
        field: "logo",
      },
      {
        label: (
          <div style={{ cursor: "pointer", fontWeight: "bold" }}>Status</div>
        ),
        field: "status",
      },
      {
        label: (
          <div style={{ cursor: "pointer", fontWeight: "bold" }}>Date</div>
        ),
        field: "createdAt",
      },
      {
        label: (
          <div style={{ cursor: "pointer", fontWeight: "bold" }}>Email</div>
        ),
        field: "email",
      },
      {
        label: (
          <div style={{ cursor: "pointer", fontWeight: "bold" }}>Slug</div>
        ),
        field: "slug",
      },
      {
        label: <div style={{ cursor: "pointer", fontWeight: "bold" }}>Nom</div>,
        field: "nom",
      },
      {
        label: <div style={{ cursor: "pointer", fontWeight: "bold" }}>Sponsor</div>,
        field: "sponsor",
      },
      {
        label: (
          <div style={{ cursor: "pointer", fontWeight: "bold" }}>Couleurs</div>
        ),
        field: "colors",
      },
      {
        label: (
          <div style={{ cursor: "pointer", fontWeight: "bold" }}>Action</div>
        ),
        field: "action",
      },
    ];
    let rows = [];

    if (requests && requests.length > 0) {
      requests.map(item => {
        rows.push({
          logo: <img src={item.logoSmall} width={50} height={50} />,
          status: (
            <Status status={getStatus(item.status)}>{item.status}</Status>
          ),
          createdAt: formatDate(item.createdAt),
          email: item.email,
          colors: (
            <div style={{ display: "flex" }}>
              <BlocColor color={item.color1} />
              <BlocColor color={item.color2} />
              <BlocColor color={item.color3} />
            </div>
          ),
          slug: item.slug,
          nom: item.whiteLabelName,
          sponsor: item.sponsor || "",
          action: (
            <Button
              onClick={e => {
                e.stopPropagation();
                setselectedSlug(item.slug);
              }}
              variant={"contained"}
            >
              Action
            </Button>
          ),
        });
      });
    }
    setDataTable({ columns, rows });
  };

  if (isLoading) {
    return (
      <div>
        <LinearProgress />
      </div>
    );
  }

  return (
    <>
      <MDBDataTable
        striped
        entriesOptions={[10, 20, 50]}
        entries={10}
        noBottomColumns
        infoLabel={["", "-", "sur", "résultats"]}
        sortable
        searchLabel={"Recherche"}
        noRecordsFoundLabel={"aucun enregistrement correspondant trouvé"}
        paging={dataTable && dataTable.rows && dataTable.rows.length > 0}
        paginationLabel={[
          <div style={{ cursor: "pointer" }}>Précédent</div>,
          <div style={{ cursor: "pointer" }}>Suivant</div>,
        ]}
        info={true}
        entriesLabel={"Afficher les résultats"}
        data={dataTable}
      />
      <Modale
        title="Demande whitelabel"
        content="Voulez-vous accepter le whitelabel ?"
        isOpen={selectedSlug !== null}
        close={() => setselectedSlug(null)}
        actions={[
          {
            title: "Non",
            click: () =>
              refuseWhitelabelRequest(selectedSlug, () => setRefetch(true)),
          },
          {
            title: "Oui",
            click: () =>
              acceptWhitelabelRequest(selectedSlug, () => setRefetch(true)),
          },
        ]}
      />
    </>
  );
}
