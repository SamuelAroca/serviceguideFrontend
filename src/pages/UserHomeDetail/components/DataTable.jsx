/* import { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { formatPrice } from "../../../AxiosHelper";
import { GrayPaleteColors } from "../../../palete-colors/gray-colors.palete";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 20px 5px;
  background-color: white;
  border-bottom: 1px solid ${GrayPaleteColors.C50};
  text-align: left;
`;

const TableRow = styled.tr`
  background-color: white;
  border-bottom: 1px solid ${GrayPaleteColors.C50};
  transition: 0.3s all;
  &:hover {
    background-color: ${GrayPaleteColors.C100};
  }
`;

const TableCell = styled.td`
  padding: 20px 5px;
`;

const DataTable = ({ data }) => {
  const [yearFilter, setYearFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");

  const filterByYear = (data, year) => {
    if (year === "all") {
      return data;
    } else {
      return data.filter((item) => moment(item.date).year() === Number(year));
    }
  };

  const filterByMonth = (data, month) => {
    if (month === "all") {
      return data;
    } else {
      return data.filter(
        (item) => moment(item.date).month() === Number(month) - 1
      );
    }
  };

  const filteredData = filterByMonth(
    filterByYear(data, yearFilter),
    monthFilter
  );

  const handleYearFilterChange = (e) => {
    setYearFilter(e.target.value);
  };

  const handleMonthFilterChange = (e) => {
    setMonthFilter(e.target.value);
  };

  return (
    <>
      <h1>Facturas</h1>
      <div>
        <label htmlFor="yearFilter">Filtrar por año:</label>
        <select
          id="yearFilter"
          value={yearFilter}
          onChange={handleYearFilterChange}
        >
          <option value="all">Todos</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
      </div>
      <div>
        <label htmlFor="monthFilter">Filtrar por mes:</label>
        <select
          id="monthFilter"
          value={monthFilter}
          onChange={handleMonthFilterChange}
        >
          <option value="all">Todos</option>
          <option value="1">Enero</option>
          <option value="2">Febrero</option>
        </select>
      </div>

      <Table>
        <thead>
          <TableRow>
            <TableHeader>Amount</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>House Name</TableHeader>
            <TableHeader>Receipt Name</TableHeader>
            <TableHeader>Type of Service</TableHeader>
            <TableHeader>Price</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.amount}</TableCell>
              <TableCell>{moment(item.date).format("DD/MM/YYYY")}</TableCell>
              <TableCell>{item.houseName}</TableCell>
              <TableCell>{item.receiptName}</TableCell>
              <TableCell>{item.typeService.type}</TableCell>
              <TableCell>{formatPrice(item.price)}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default DataTable; */

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";

const DataTable = ({ data }) => {
  const [filters, setFilters] = useState({
    date: "",
    amount: "",
    price: "",
    receiptName: "",
    typeService: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredData = data?.filter((item) => {
    return Object.keys(filters).every((key) => {
      if (filters[key] === "") return true;
      if (key === "date") {
        const formattedDate = new Date(item[key]).toLocaleDateString();
        return formattedDate.includes(filters[key]);
      }
      return String(item[key])
        .toLowerCase()
        .includes(filters[key].toLowerCase());
    });
  });

  return (
    <div>
      <h1>Facturas</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Receipt Name</TableCell>
              <TableCell>Type Service</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <TextField
                  name="date"
                  value={filters.date}
                  onChange={handleFilterChange}
                  variant="outlined"
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="amount"
                  value={filters.amount}
                  onChange={handleFilterChange}
                  variant="outlined"
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="price"
                  value={filters.price}
                  onChange={handleFilterChange}
                  variant="outlined"
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="receiptName"
                  value={filters.receiptName}
                  onChange={handleFilterChange}
                  variant="outlined"
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="typeService"
                  value={filters.typeService}
                  onChange={handleFilterChange}
                  variant="outlined"
                  size="small"
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {new Date(item.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.receiptName}</TableCell>
                <TableCell>{item.typeService.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DataTable;
