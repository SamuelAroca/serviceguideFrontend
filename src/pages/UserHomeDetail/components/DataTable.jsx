import React, { useState, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Tooltip,
  InputAdornment,
} from "@mui/material";
import { FormatDate, formatPrice } from "../../../Utilities";
import { BsTrash, BsPencil, BsSearch } from "react-icons/bs";
import { MyContext } from "../../../context/UserContext";
import { toast, Toaster } from "react-hot-toast";
import { getUserHousesService } from "../../../services/get-user-houses.service";
import httpClient from "../../../api/httpClient";
import Modal from "./Modal";
import FormEdit from "./FormEdit";
import Swal from "sweetalert2";
import { BluePaleteColors } from "../../../palete-colors/blue-colors.palete";
import { GrayPaleteColors } from "../../../palete-colors/gray-colors.palete";

const DataTable = ({ data }) => {
  const [filters, setFilters] = useState({
    date: "",
    amount: "",
    price: "",
    receiptName: "",
    typeService: "",
  });

  const apiUrl = import.meta.env.VITE_API_RECEIPT;

  const { setHouses, userData } = useContext(MyContext);

  const [selectedItem, setSelectedItem] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const onCloseShare = () => {
    setOpenModal(false);
  };

  const getUserHouses = async () => {
    try {
      const data = await getUserHousesService(userData.id);
      setHouses(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const notify = () => toast.success("Deleted successfully.");

  // Más recientes primero. .filter() ya devuelve un arreglo nuevo, así que
  // .sort() no muta la lista de recibos original.
  const filteredData = data
    ?.filter((item) => {
      return Object.keys(filters).every((key) => {
        if (filters[key] === "") return true;
        if (key === "date") {
          const formattedDate = new Date(item[key]).toLocaleDateString();
          return formattedDate.includes(filters[key]);
        }
        if (key === "typeService") {
          return item[key].toLowerCase().includes(filters[key].toLowerCase());
        }
        return String(item[key])
          .toLowerCase()
          .includes(filters[key].toLowerCase());
      });
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleDeleteRow = async (id) => {
    Swal.fire({
      title: `¿Deseas eliminar el recibo?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar recibo",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await httpClient.delete(`${apiUrl}/delete/${id}`);
          getUserHouses(setHouses, userData?.id);
          notify();
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleEditRow = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const filterField = (name, placeholder) => (
    <TextField
      name={name}
      value={filters[name]}
      onChange={handleFilterChange}
      placeholder={placeholder}
      variant="standard"
      size="small"
      fullWidth
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <InputAdornment position="start">
            <BsSearch size={12} color={GrayPaleteColors.C400} />
          </InputAdornment>
        ),
      }}
    />
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: 0,
      }}
    >
      <h1 style={{ flexShrink: 0 }}>Facturas</h1>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "1rem",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.08)",
          flex: 1,
          minHeight: 0,
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "6px",
            height: "6px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "white",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "10px",
            backgroundColor: "#ddd",
          },
        }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {["Fecha", "Cantidad", "Precio", "Nombre", "Tipo de Servicio", "Acciones"].map(
                (label) => (
                  <TableCell
                    key={label}
                    sx={{
                      backgroundColor: BluePaleteColors.C600,
                      color: "#fff",
                      fontWeight: 600,
                    }}
                  >
                    {label}
                  </TableCell>
                )
              )}
            </TableRow>
            <TableRow>
              <TableCell sx={{ backgroundColor: GrayPaleteColors.C50 }}>
                {filterField("date", "Buscar fecha")}
              </TableCell>
              <TableCell sx={{ backgroundColor: GrayPaleteColors.C50 }}>
                {filterField("amount", "Buscar cantidad")}
              </TableCell>
              <TableCell sx={{ backgroundColor: GrayPaleteColors.C50 }}>
                {filterField("price", "Buscar precio")}
              </TableCell>
              <TableCell sx={{ backgroundColor: GrayPaleteColors.C50 }}>
                {filterField("receiptName", "Buscar nombre")}
              </TableCell>
              <TableCell sx={{ backgroundColor: GrayPaleteColors.C50 }}>
                {filterField("typeService", "Buscar tipo")}
              </TableCell>
              <TableCell sx={{ backgroundColor: GrayPaleteColors.C50 }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.length ? (
              filteredData.map((item) => (
                <TableRow
                  key={item.id}
                  hover
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: GrayPaleteColors.C50,
                    },
                  }}
                >
                  <TableCell>{FormatDate(item.date)}</TableCell>
                  <TableCell>
                    {item.amount} {item.typeService === "ENERGY" ? "kwh" : "m³"}
                  </TableCell>
                  <TableCell>${formatPrice(item.price)}</TableCell>
                  <TableCell>{item.receiptName}</TableCell>
                  <TableCell>{item.typeService}</TableCell>
                  <TableCell>
                    <Tooltip title="Eliminar recibo">
                      <span>
                        <BsTrash
                          onClick={() => handleDeleteRow(item.id)}
                          style={{ cursor: "pointer" }}
                        />
                      </span>
                    </Tooltip>
                    <Tooltip title="Editar recibo">
                      <span>
                        <BsPencil
                          onClick={() => handleEditRow(item)}
                          style={{ cursor: "pointer", marginLeft: "10px" }}
                        />
                      </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  sx={{ color: GrayPaleteColors.C400, py: 4 }}
                >
                  {data?.length
                    ? "Ningún recibo coincide con los filtros."
                    : "Todavía no tienes recibos registrados."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal isOpen={openModal} onClose={onCloseShare}>
        {selectedItem && <FormEdit data={selectedItem} onClose={onCloseShare} />}
      </Modal>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default DataTable;
