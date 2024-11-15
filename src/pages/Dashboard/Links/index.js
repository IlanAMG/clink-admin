import * as React from "react";
import { useEffect, useState, useCallback } from "react";
import CardHeader from "@mui/material/CardHeader";
import { MDBDataTable } from "mdbreact";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { useSelector, useDispatch } from "react-redux";
import { linksSelector } from "../../../store/Links";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import { format } from "date-fns";
import { deleteLinkById, getProductByLinkId } from "../../../modules/links";
import { fetchLinks } from "../../../store/Links/features";
import { ModaleGenerateLink } from "../../../components/ModaleGenerateLink/ModaleGenerateLink";
import { whitelabelListSelector } from "../../../store/Whitelabel/WhitelabelList";
import styled from "styled-components";
import { FilterProductLink } from "./FilterProductLink";
import { ConfirmationModal } from "../../../components/ConfirmationModal";

const Filters = styled.div`
  height: 72px;
  width: 100%;
  display: flex;
  gap: 24px;
  padding: 0 16px;
`;

export default function WhitelabelList() {
  const { links, isLoading } = useSelector(linksSelector);
  const { selectedWhiteLabel } = useSelector(whitelabelListSelector);
  const [filterProductOnly, setFilterProductOnly] = useState("");
  const [dataTable, setDataTable] = useState([]);
  const [filteredDatatable, setFilteredDatatable] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [modalGenerateOpen, setModalGenerateOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading) fetchData();
  }, [isLoading]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (refetch) {
      dispatch(fetchLinks());
      setRefetch(false);
      setSelectedId(null);
    }
  }, [refetch, dispatch]);

  const fetchData = async () => {
    let columns = [
      {
        label: (
          <div style={{ cursor: "pointer", fontWeight: "bold" }}>Product</div>
        ),
        field: "product",
      },
      {
        label: <div style={{ cursor: "pointer", fontWeight: "bold" }}>URL</div>,
        field: "link",
      },
      {
        label: (
          <div style={{ cursor: "pointer", fontWeight: "bold" }}>
            Created At{" "}
          </div>
        ),
        field: "usedAt",
      },
      {
        label: (
          <div style={{ cursor: "pointer", fontWeight: "bold" }}>Is Used</div>
        ),
        field: "isUsed",
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
            Whitelabel
          </div>
        ),
        field: "whitelabel",
      },
      {
        label: (
          <div style={{ cursor: "pointer", fontWeight: "bold" }}>Delete</div>
        ),
        field: "delete",
      },
    ];
    let rows = [];
    if (links && links.length > 0) {
      await Promise.all(
        links.map(async (item) => {
          return rows.push({
            product: item.productId ? (
              <img
                alt="product"
                src={"/ressources/spinner.svg"}
                style={{ borderRadius: "50%", width: "48px" }}
              />
            ) : (
              ""
            ),
            link: item.link,
            usedAt: format(item.usedAt, "MM/dd/yyyy HH:mm"),
            isUsed: item.isUsed ? "Used" : "Not Used",
            email: item.email ? item.email : "No Email",
            whitelabel: item.whitelabel ? item.whitelabel : "No whitelabel",
            delete: !item.isUsed ? (
              <Button
                variant={"contained"}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId(item.link);
                }}
              >
                DELETE
              </Button>
            ) : (
              ""
            ),
          });
        })
      );
    }
    setDataTable({ columns, rows });
  };

  const getProductsForPage = useCallback(async () => {
    if (!filteredDatatable?.rows) return null;
    await Promise.all(
      filteredDatatable.rows.map(async (link) => {
        const row = filteredDatatable?.rows.find(
          (row) => row.link === link.link
        );
        if (
          !row?.product ||
          (row?.product.type === "img" &&
            row?.product.props?.src !== "/ressources/spinner.svg")
        )
          return Promise.resolve();
        const product = await getProductByLinkId(link.link);

        setFilteredDatatable((state) => ({
          ...state,
          rows: state.rows.map((row) =>
            row.link === link.link
              ? {
                  ...row,
                  product: product.product_image ? (
                    <img
                      alt="product"
                      src={product.product_image || ""}
                      style={{
                        borderRadius: product.category.includes("sticker")
                          ? "50%"
                          : 0,
                        width: "48px",
                      }}
                    />
                  ) : (
                    <img
                      alt="product"
                      src={"/ressources/not_found.png"}
                      style={{ width: "48px", borderRadius: "50%" }}
                    />
                  ),
                }
              : row
          ),
        }));
      })
    );
  }, [filteredDatatable?.rows?.length]);

  const getFilteredDatatable = useCallback(() => {
    if (!dataTable?.rows) return null;
    setFilteredDatatable({
      ...dataTable,
      rows: dataTable.rows.filter((x) => {
        if (filterProductOnly?.includes("Avec") && !x.product) return false;
        if (filterProductOnly?.includes("Sans") && x.product) return false;
        if (!selectedWhiteLabel || selectedWhiteLabel === "All whitelabels")
          return true;
        if (!x.whitelabel) return false;
        return selectedWhiteLabel.toLowerCase() === x.whitelabel.toLowerCase();
      }),
    });
  }, [dataTable, filterProductOnly, selectedWhiteLabel]);

  useEffect(() => {
    getProductsForPage();
  }, [getProductsForPage]);

  useEffect(() => {
    getFilteredDatatable();
  }, [getFilteredDatatable]);

  useEffect(() => {
    return () => {
      setFilteredDatatable([]);
      setDataTable([]);
    };
  }, []);

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
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px 15px 0 0",
          }}
        >
          <CardHeader title={"Links"} />
          <Button variant="outlined" onClick={() => setModalGenerateOpen(true)}>
            GENERATE LINK
          </Button>
        </div>
        <Filters>
          <FilterProductLink
            filterProductOnly={filterProductOnly}
            setFilterProductOnly={setFilterProductOnly}
          />
        </Filters>
        <CardContent>
          <MDBDataTable
            striped
            entriesOptions={[10, 20, 50]}
            entries={10}
            noBottomColumns
            infoLabel={["", "-", "sur", "résultats"]}
            sortable
            searchLabel={"Recherche"}
            noRecordsFoundLabel={"aucun enregistrement correspondant trouvé"}
            paging={
              filteredDatatable &&
              filteredDatatable.rows &&
              filteredDatatable.rows.length > 0
            }
            paginationLabel={[
              <div style={{ cursor: "pointer" }}>Précédent</div>,
              <div style={{ cursor: "pointer" }}>Suivant</div>,
            ]}
            info={true}
            entriesLabel={"Afficher les résultats"}
            data={filteredDatatable}
            sortRows={["usedAt"]}
          />
        </CardContent>
      </Card>
      <ConfirmationModal
        title="Supprimer ce lien"
        content="Voulez-vous supprimer ce lien ?"
        isOpen={selectedId !== null}
        close={() => setSelectedId(null)}
        onConfirmation={() =>
          deleteLinkById(selectedId, () => setRefetch(true))
        }
      />
      <ModaleGenerateLink
        isOpen={modalGenerateOpen}
        close={() => setModalGenerateOpen(false)}
        refetch={() => setRefetch(true)}
      />
    </>
  );
}
