import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Paper,
} from "@mui/material";

const initialData = [
  { id: 1, name: "Alice", date: "2024-02-29", amount: 120, status: "Pending" },
  { id: 2, name: "Bob", date: "2024-02-28", amount: 90, status: "Completed" },
  {
    id: 3,
    name: "Charlie",
    date: "2024-02-27",
    amount: 150,
    status: "Pending",
  },
  {
    id: 4,
    name: "David",
    date: "2024-02-26",
    amount: 110,
    status: "Completed",
  },
];

const columns = [
  { id: "name", label: "Name", sortable: true },
  { id: "date", label: "Date", sortable: true },
  { id: "amount", label: "Amount ($)", sortable: true },
  { id: "status", label: "Status", sortable: false },
];

const DataTable = () => {
  const [data, setData] = useState(initialData);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [search, setSearch] = useState("");

  const handleSort = (columnId) => {
    const isAsc = orderBy === columnId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(columnId);
    const sortedData = [...data].sort((a, b) => {
      return isAsc
        ? a[columnId] > b[columnId]
          ? -1
          : 1
        : a[columnId] < b[columnId]
        ? -1
        : 1;
    });
    setData(sortedData);
  };

  const filteredData = data.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Paper sx={{ padding: 2, maxWidth: 800, margin: "auto" }}>
      <TextField
        label="Search by Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  {column.sortable ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "asc"}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DataTable;
