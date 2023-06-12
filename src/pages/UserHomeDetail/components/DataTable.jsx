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
} from "@mui/material";
import { FormatDate, formatPrice } from "../../../AxiosHelper";
import { BsTrash, BsPencil } from "react-icons/bs";
import axios from "axios";
import { MyContext } from "../../../context/UserContext";
import { getUserDataService } from "../../../services/get-user-data.service";
import { toast, Toaster } from "react-hot-toast";
import { getUserHousesService } from "../../../services/get-user-houses.service";
import Modal from "./Modal";
import FormEdit from "./FormEdit";
import Swal from "sweetalert2";

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
      console.log(err.message);
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

  const filteredData = data?.filter((item) => {
    return Object.keys(filters).every((key) => {
      if (filters[key] === "") return true;
      if (key === "date") {
        const formattedDate = new Date(item[key]).toLocaleDateString();
        return formattedDate.includes(filters[key]);
      }
      if (key === "typeService") {
        return item[key].type
          .toLowerCase()
          .includes(filters[key].toLowerCase());
      }
      return String(item[key])
        .toLowerCase()
        .includes(filters[key].toLowerCase());
    });
  });

  const handleDeleteRow = async (id) => {
    Swal.fire({
      title: `¿Deseas eliminar ${filters.receiptName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar recibo",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const data = axios.delete(`${apiUrl}/delete/${id}`);
          getUserHouses(setHouses, userData?.id);
          notify();
        } catch (error) {
          console.log(error.message);
        }
      }
    });
  };

  const handleEditRow = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  return (
    <div>
      <h1>Facturas</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Tipo de Servicio</TableCell>
              <TableCell>Acciones</TableCell>
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
              <TableCell>
                <BsTrash />
                <BsPencil style={{ cursor: "pointer", marginLeft: "10px" }} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{FormatDate(item.date)}</TableCell>
                <TableCell>
                  {item.amount}{" "}
                  {item.typeService.type === "ENERGY" ? "KWh" : " m³"}
                </TableCell>
                <TableCell>{formatPrice(item.price)}</TableCell>
                <TableCell>{item.receiptName}</TableCell>
                <TableCell>{item.typeService.type}</TableCell>
                <TableCell>
                  <BsTrash
                    onClick={() => handleDeleteRow(item.id)}
                    style={{ cursor: "pointer" }}
                  />
                  <BsPencil
                    onClick={() => handleEditRow(item)}
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal isOpen={openModal} onClose={onCloseShare}>
        {selectedItem && <FormEdit data={selectedItem} />}
      </Modal>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default DataTable;
