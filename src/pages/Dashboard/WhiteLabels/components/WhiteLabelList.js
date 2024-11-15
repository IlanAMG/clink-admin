import * as React from "react";
import { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { useSelector, useDispatch } from "react-redux";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import ModalWhiteLabel from "../../../../components/ModalWhiteLabel/ModalWhiteLabel";

import { fetchWhitelabelList } from "../../../../store/Whitelabel/WhitelabelList/features";
import { whitelabelListSelector } from "../../../../store/Whitelabel/WhitelabelList";

import { fetchAllEarnings } from "../../../../store/Whitelabel/Earnings/features";
import { allEarningsSelector } from "../../../../store/Whitelabel/Earnings";
import { useNavigate } from "react-router-dom";

const useStyle = (theme) => ({
  cardHeader: {
    textDecorationColor: "whiter",
    backgroundColor: "#96CED5",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(6, 210, 235, .3)",
  },
});

export default function WhitelabelList({
  selectedWhitelabel,
  setSelectedWhitelabel,
}) {
  const navigate = useNavigate();
  const {
    whiteLabelList,
    isLoading,
    selectedWhiteLabel: filterWhitelabel,
  } = useSelector(whitelabelListSelector);
  const { allEarnings } = useSelector(allEarningsSelector);
  const [dataTable, setDataTable] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [refetchEarnings, setRefetchEarnings] = useState(false);
  const [whitelabelsWithEarnings, setWhitelabelsWithEarnings] = useState([]);
  const dispatch = useDispatch();
  const classes = useStyle();

  const handlePaid = (date, selectedWhitelabel) => {
    const copyWhitelabelsWithEarnings = [...whitelabelsWithEarnings].map(
      (whitelabel) => {
        if (selectedWhitelabel.id !== whitelabel.id) return whitelabel;
        const hasCheck = whitelabel.allPayments.includes(date);
        let newWhitelabel;
        if (hasCheck) {
          newWhitelabel = {
            ...whitelabel,
            allPayments: whitelabel.allPayments.filter(
              (paymentDate) => date !== paymentDate
            ),
          };
        } else {
          newWhitelabel = {
            ...whitelabel,
            allPayments: [...whitelabel.allPayments, date],
          };
        }
        setSelectedWhitelabel(newWhitelabel);
        return newWhitelabel;
      }
    );
    setWhitelabelsWithEarnings(copyWhitelabelsWithEarnings);
  };

  useEffect(() => {
    if (!isLoading) fetchData();
  }, [isLoading]);

  useEffect(() => {
    if (refetch) {
      dispatch(fetchWhitelabelList());
      setRefetch(false);
      setSelectedWhitelabel(null);
    }
  }, [refetch, dispatch]);

  useEffect(() => {
    dispatch(fetchAllEarnings());
  }, [refetch, dispatch]);

  useEffect(() => {
    fetchData();
  }, [filterWhitelabel, whitelabelsWithEarnings]);

  useEffect(() => {
    setWhitelabelsWithEarnings(
      whiteLabelList.map((whitelabel) => ({
        ...whitelabel,
        ...allEarnings.find((allEarning) => allEarning.id === whitelabel.id),
      }))
    );
  }, [whiteLabelList, allEarnings, refetch]);

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
          <div style={{ cursor: "pointer", fontWeight: "bold" }}>Slug</div>
        ),
        field: "slug",
      },
      {
        label: <div style={{ cursor: "pointer", fontWeight: "bold" }}>Nom</div>,
        field: "nom",
      },
      {
        label: (
          <div style={{ cursor: "pointer", fontWeight: "bold" }}>Sponsor</div>
        ),
        field: "sponsor",
      },
      {
        label: (
          <div style={{ cursor: "pointer", fontWeight: "bold" }}>Action</div>
        ),
        field: "action",
      },
    ];
    let rows = [];
    if (whitelabelsWithEarnings && whitelabelsWithEarnings.length > 0) {
      whitelabelsWithEarnings
        .filter((x) => {
          if (!filterWhitelabel || filterWhitelabel === "All whitelabels") {
            return true;
          }
          return filterWhitelabel.toLowerCase() === x.slug.toLowerCase();
        })
        .map((item) => {
          rows.push({
            logo: <img src={item.logoSmall} width={50} height={50} />,
            nom: item.whiteLabelName,
            slug: item.slug,
            sponsor: item.sponsor || "",
            action: (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/dashboard/whitelabels/" + item.id);
                }}
                variant={"contained"}
              >
                EDIT
              </Button>
            ),
            clickEvent: () =>
              window.open(`https://www.gpm.business/${item.slug}/sign-up`),
          });
        });
    }
    setDataTable({ columns, rows });
  };

  if (isLoading) {
    return (
      <div>
        <LinearProgress />
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
      <ModalWhiteLabel
        refetch={() => setRefetch(true)}
        selectedWhitelabel={selectedWhitelabel}
        setSelectedWhitelabel={setSelectedWhitelabel}
        creation={!Boolean(selectedWhitelabel?.id)}
        handlePaid={handlePaid}
      />
    </>
  );
}
