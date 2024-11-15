import { useState, useEffect } from "react";
import { Modale } from "../Modale";
import { MDBDataTable } from "mdbreact";
import { ContainerTableData } from "./StyledModalSecondaryProfils";
import { Button } from "@mui/material";

export default function ModalSecondaryProfils({
  allSecondaryProfils,
  setSecondaryProfils,
  setSelectedUser,
}) {
  const [dataTable, setDataTable] = useState([]);

  const fetchData = () => {
    const columnNames = [
      "Photo",
      "First_Name",
      "Last_Name",
      "Business_Name",
      "Action",
    ];
    const columns = columnNames.map((item) => ({
      label: (
        <div style={{ cursor: "pointer", fontWeight: "bold" }}>
          {item.replace("_", " ")}
        </div>
      ),
      field: item.toLowerCase(),
    }));

    let rows = [];
    if (allSecondaryProfils?.length > 0) {
      allSecondaryProfils.map((item, index) => {
        rows.push({
          id: index + 1,
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
          first_name: item.firstName,
          last_name: item.lastName,
          business_name: item.businessName,
          action: (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedUser(item);
                setSecondaryProfils(null);
              }}
            >
              Action
            </Button>
          ),
          clickEvent: () =>
            window.open(
              `https://www.gpm.business/${item.whiteLabel}/u/${item.id}`
            ),
        });
      });
    }
    setDataTable({ columns, rows });
  };

  useEffect(() => {
    if (allSecondaryProfils !== null) fetchData();
  }, [allSecondaryProfils]);

  return (
    <>
      <Modale
        title={`Les profils associés au compte principal`}
        isOpen={allSecondaryProfils !== null}
        close={() => setSecondaryProfils(null)}
        actions={[]}
        cancelText="Retour"
      >
        <ContainerTableData howMuchData={allSecondaryProfils?.length}>
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
        </ContainerTableData>
      </Modale>
    </>
  );
}
