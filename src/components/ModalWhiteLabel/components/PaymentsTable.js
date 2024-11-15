import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(date, earnings, paid) {
    return { date, earnings, paid };
}

export default function PaymentsTable({ selectedWhitelabel, handlePaid }) {
    const rows = selectedWhitelabel?.earningsSort.map(({ date, total }) => (
        createData(
            date,
            total + "€",
            <input
                style={{ cursor: "pointer" }}
                type="checkbox"
                checked={selectedWhitelabel.allPayments.includes(date)}
                onChange={() => handlePaid(date, selectedWhitelabel)}
            />
        )
    ))
    return (
        <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 500 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Earnings</TableCell>
                        <TableCell>Paid</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map((row) => (
                        <TableRow
                            key={row.date}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.date}
                            </TableCell>
                            <TableCell>{row.earnings}</TableCell>
                            <TableCell>{row.paid}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
