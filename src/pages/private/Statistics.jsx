/*
import SideNav from "./SideNav";
import { useState } from "react";

const Statistics = () => {

  const allCategories = ["House", "Year", "Quarter", "Semester", "Month"];

  const [categories, setCategories] = useState(allCategories);
  const [articles, setArticles] = useState();

  const filterCategory = (category) => {
    console.log(category);
  }

  return (
    <>
      <SideNav />
      <h1>ESTAS SON LAS ESTADISTICAS</h1>
    </>
  );
};

export default Statistics;
*/
import React, { useState, useEffect } from "react";
import { Bar, Line, Pie, Scatter } from "react-chartjs-2";
import { getToken, initAxiosInterceptor } from "../../AxiosHelper";
import axios from "axios";
import moment from "moment-timezone";

const Statistics = () => {
  const [invoices, setInvoices] = useState([]);
  console.log(invoices, "Hola");
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [filterYear, setFilterYear] = useState("");

  const url = import.meta.env.VITE_API_RECEIPT;

  /* const FormatDate = (date) => {
    const timedifference = -1440; // diferencia horaria en minutos
    const dateColombia = moment(date).subtract(timedifference, "minutes");
    const formatDate = dateColombia.locale("es").format("DD-MM-YYYY");
    return formatDate;
  }; */

  //localhost:5001/api/receipt/getAllReceiptsByHouse/{casa}/{token}

  const getData = async () => {
    const accessToken = getToken();
    try {
      const { data } = await axios.get(
        `${url}/getAllReceiptsByHouse/Casa Laureles/${accessToken}`
      );
      /* {
        "id": 81,
        "receiptName": "Recibo Prueba Jenkins",
        "price": 100000.0,
        "amount": 20.0,
        "houseName": "Casa Laureles",
        "date": 1012626000000,
        "typeService": {
            "id": 3,
            "type": "ENERGY"
        }
    }, */
      const formattedData = data.map((item) => {
        const formattedItem = {
          service: "Agua", // Obtener el tipo de servicio
          price: 50,
          type: "regular", // Definir el tipo de factura según el tipo de servicio
          date: new Date(2020, 0),
          quantity: 100,
        };
        return formattedItem;
      });
      setInvoices(formattedData);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // Aplicar los filtros según las selecciones del usuario
    initAxiosInterceptor();
    let filteredData = invoices || [];
    if (filterType !== "all") {
      filteredData = filteredData.filter(
        (invoice) => invoice.type === filterType
      );
    }
    if (filterYear !== "") {
      filteredData = filteredData.filter(
        (invoice) => invoice.date.getFullYear() === parseInt(filterYear)
      );
    }
    setFilteredInvoices(filteredData);
  }, [filterType, filterYear]);

  // Datos de prueba
  /*   const invoices = [
    { service: 'Agua', price: 50, type: 'regular', date: new Date(2023, 0), quantity: 10 },
    { service: 'Agua', price: 70, type: 'regular', date: new Date(2023, 1), quantity: 15 },
    { service: 'Agua', price: 60, type: 'ajuste', date: new Date(2023, 2), quantity: 12 },
    { service: 'Agua', price: 80, type: 'exceso', date: new Date(2023, 3), quantity: 18 },
    { service: 'Luz', price: 100, type: 'regular', date: new Date(2023, 0), quantity: 100 },
    { service: 'Luz', price: 120, type: 'regular', date: new Date(2023, 1), quantity: 110 },
    { service: 'Luz', price: 90, type: 'ajuste', date: new Date(2023, 2), quantity: 95 },
    { service: 'Luz', price: 130, type: 'exceso', date: new Date(2023, 3), quantity: 120 },
    { service: 'Alcantarillado', price: 80, type: 'regular', date: new Date(2023, 0), quantity: 1 },
    { service: 'Alcantarillado', price: 90, type: 'regular', date: new Date(2023, 1), quantity: 1 },
    { service: 'Alcantarillado', price: 85, type: 'ajuste', date: new Date(2023, 2), quantity: 1 },
    { service: 'Alcantarillado', price: 100, type: 'exceso', date: new Date(2023, 3), quantity: 1 },
    { service: 'Gas', price: 60, type: 'regular', date: new Date(2023, 0), quantity: 5 },
    { service: 'Gas', price: 80, type: 'regular', date: new Date(2023, 1), quantity: 6 },
    { service: 'Gas', price: 70, type: 'ajuste', date: new Date(2023, 2), quantity: 5 },
    { service: 'Gas', price: 90, type: 'exceso', date: new Date(2023, 3), quantity: 7 },
  ]; */

  // Datos para los gráficos
  const serviceLabels = ["Agua", "Luz", "Alcantarillado", "Gas"];

  const monthlyServiceData = {
    labels: serviceLabels,
    datasets: [
      {
        label: "Gastos mensuales por servicio",
        data: serviceLabels.map((service) =>
          filteredInvoices.reduce((acc, invoice) => {
            if (invoice.service === service) {
              return acc + invoice.price;
            }
            return acc;
          }, 0)
        ),
        backgroundColor: [
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(255, 205, 86, 0.5)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 205, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const monthlyServiceOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const monthlyCostData = {
    labels: filteredInvoices.map((invoice) =>
      invoice.date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    ),
    datasets: serviceLabels.map((service, index) => ({
      label: service,
      data: filteredInvoices.map((invoice) =>
        invoice.service === service ? invoice.price : null
      ),
      backgroundColor: `rgba(54, 162, 235, ${(index + 1) * 0.2})`,
      borderColor: `rgba(54, 162, 235, 1)`,
      borderWidth: 1,
      pointRadius: 3,
    })),
  };

  const monthlyCostOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const invoiceTypeData = {
    labels: [...new Set(filteredInvoices.map((invoice) => invoice.type))],
    datasets: [
      {
        data: [...new Set(filteredInvoices.map((invoice) => invoice.type))].map(
          (type) =>
            filteredInvoices.reduce((acc, invoice) => {
              if (invoice.type === type) {
                return acc + invoice.price;
              }
              return acc;
            }, 0)
        ),
        backgroundColor: [
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(255, 205, 86, 0.5)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 205, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const consumptionCostData = {
    datasets: serviceLabels.map((service) => ({
      label: service,
      data: filteredInvoices
        .filter((invoice) => invoice.service === service)
        .map((invoice) => ({ x: invoice.quantity, y: invoice.price })),
      backgroundColor: "rgba(54, 162, 235, 0.5)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    })),
  };

  return (
    <div style={{ dislplay: "flex", width: "100%", justifyContent: "center" }}>
      <h2>Gráficos de facturas</h2>

      <label>Tipo de factura:</label>
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="all">Todos</option>
        <option value="regular">Regular</option>
        <option value="ajuste">Ajuste</option>
        <option value="exceso">Consumo excesivo</option>
      </select>

      <label>Año:</label>
      <input
        type="number"
        min="2000"
        max="2099"
        value={filterYear}
        onChange={(e) => setFilterYear(e.target.value)}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          width: "100%",
        }}
      >
        <div>
          <h3>Gastos mensuales por servicio</h3>
          <Bar data={monthlyServiceData} options={monthlyServiceOptions} />
        </div>

        <div>
          <h3>Evolución del costo mensual por servicio</h3>
          <Line data={monthlyCostData} options={monthlyCostOptions} />
        </div>

        <div>
          <h3>Porcentaje de gastos por tipo de factura</h3>
          <Pie data={invoiceTypeData} />
        </div>

        <div>
          <h3>Relación entre consumo y costo</h3>
          <Scatter data={consumptionCostData} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
