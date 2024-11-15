import * as React from "react";
import { useEffect, useState } from "react";
import CardHeader from "@mui/material/CardHeader";
import { MDBDataTable } from "mdbreact";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchAllReports } from "../../../../store/reports/features";
import { reportsSelector } from "../../../../store/reports/index";
import { format } from "date-fns";

export default function ReportsList() {
  const { reports, isLoading } = useSelector(reportsSelector);
  const [dataTable, setDataTable] = useState([]);
  const dispatch = useDispatch();

  const fetchData = async () => {
    let columns = [
      {
        label: (
          <div style={{ cursor: "pointer", fontWeight: "bold" }}>Date</div>
        ),
        field: "date",
      },
      {
        label: (
          <div style={{ cursor: "pointer", fontWeight: "bold" }}>
            Reported email
          </div>
        ),
        field: "email",
      },
      {
        label: (
          <div style={{ cursor: "pointer", fontWeight: "bold" }}>
            Reported profile
          </div>
        ),
        field: "reported_profile",
      },
      {
        label: (
          <div style={{ cursor: "pointer", fontWeight: "bold" }}>
            Reported by
          </div>
        ),
        field: "reported_by",
      },
      {
        label: (
          <div style={{ cursor: "pointer", fontWeight: "bold" }}>Report</div>
        ),
        field: "report",
      },
    ];
    let rows = [];
    if (reports && reports.length > 0) {
      reports.map((item) =>
        rows.push({
          date: item.date ? format(item.date, "yyyy/MM/dd") : "No date",
          email: item.emailOfReportingUser || "user has no email",
          reported_profile: (
            <a
              style={{ color: "#5FD4D0", textDecoration: "underline" }}
              href={item.isReportUid}
              target="blank"
            >
              Profile
            </a>
          ),
          reported_by: (
            <a
              style={{ color: "#5FD4D0", textDecoration: "underline" }}
              href={item.hasReportUid}
              target="blank"
            >
              Profile
            </a>
          ),
          report: (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <strong>{item.option}</strong> <span>{item.message}</span>
            </div>
          ),
        })
      );
    }
    setDataTable({ columns, rows });
  };

  useEffect(() => {
    if (!isLoading) fetchData();
  }, [isLoading, reports]);

  useEffect(() => {
    dispatch(fetchAllReports());
  }, []);

  return (
    <>
      <Card>
        <CardHeader title={"Reports"} />
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
    </>
  );
}
