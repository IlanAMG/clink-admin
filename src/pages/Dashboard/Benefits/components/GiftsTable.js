import CardContent from "@mui/material/CardContent";
import { MDBDataTable } from "mdbreact";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGifts } from "../../../../store/Gifts/features";
import styled from "styled-components";
import { Button } from "@mui/material";

const BannerPreview = styled.img`
  height: 50px;
  width: 150px;
  object-fit: cover;
`;

export default function GiftsTable({
  setSelectedGift,
  setGiftModalOpen,
  whitelabels,
}) {
  const [dataTable, setDataTable] = useState([]);
  const gifts = useSelector((state) => state.gifts.value);
  const dispatch = useDispatch();

  const fetchData = () => {
    const columnNames = ["Banner", "Name", "Code", "Promotion", "Action"];
    const columns = columnNames.map((item) => ({
      label: (
        <div style={{ cursor: "pointer", fontWeight: "bold" }}>
          {item.replace("_", " ")}
        </div>
      ),
      field: item.toLowerCase(),
    }));

    let rows = [];
    if (gifts[0]) {
      rows = gifts.map((gift) => {
        return {
          banner: gift.banner ? (
            <BannerPreview src={gift.banner} alt="Banner" />
          ) : (
            ""
          ),
          name: gift.name,
          code: gift.code,
          promotion: gift.promotion,
          action: (
            <Button
              onClick={() => {
                setSelectedGift(gift);
                setGiftModalOpen(true);
              }}
            >
              EDIT
            </Button>
          ),
        };
      });
    }
    setDataTable({ columns, rows });
  };

  useEffect(() => {
    dispatch(fetchGifts());
  }, []);

  useEffect(() => {
    fetchData();
  }, [gifts]);

  return (
    <>
      <CardContent>
        <MDBDataTable
          striped
          entriesOptions={[10, 20, 50]}
          entries={10}
          noBottomColumns
          infoLabel={["", "-", "of", "results"]}
          sortable
          searchLabel={"Search"}
          noRecordsFoundLabel={"Nothing found here"}
          paging={dataTable && dataTable.rows && dataTable.rows.length > 0}
          paginationLabel={[
            <div style={{ cursor: "pointer" }}>Previous</div>,
            <div style={{ cursor: "pointer" }}>Next</div>,
          ]}
          info={true}
          entriesLabel={"Show results"}
          data={dataTable}
          sortRows={["usedAt"]}
        />
      </CardContent>
    </>
  );
}
