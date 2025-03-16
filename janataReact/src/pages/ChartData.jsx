import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-chartjs-2";

import "../App.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartData = () => {
  const [data, setData] = useState([]);
  const [tradeCodes, setTradeCodes] = useState([]);
  const [selectedTradeCode, setSelectedTradeCode] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [visualizationType, setVisualizationType] = useState("multiAxis"); // State to manage visualization type

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5001/fetchall");
      setData(response.data);

      // Extract unique trade codes
      const uniqueTradeCodes = [...new Set(response.data.map((item) => item.trade_code))];
      setTradeCodes(uniqueTradeCodes);
      setSelectedTradeCode(uniqueTradeCodes[0]); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Filter data by selected trade code
  const filteredData = selectedTradeCode
    ? data.filter((item) => item.trade_code === selectedTradeCode)
    : data;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Data for the line chart (close prices)
  const lineChartData = {
    labels: filteredData.map((item) => item.date), 
    datasets: [
      {
        type: "line",
        label: "Close Price",
        data: filteredData.map((item) => item.close),
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
    ],
  };

  // Data for the bar chart (volume)
  const barChartData = {
    labels: filteredData.map((item) => item.date),
    datasets: [
      {
        type: "bar",
        label: "Volume",
        data: filteredData.map((item) => parseFloat(item.volume.replace(/,/g, ""))), 
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Data for the multi-axis chart
  const multiAxisChartData = {
    labels: filteredData.map((item) => item.date), // Dates on the x-axis
    datasets: [
      {
        type: "line", // Line chart for close prices
        label: "Close Price",
        data: filteredData.map((item) => item.close),
        borderColor: "rgba(75, 192, 192, 1)",
        yAxisID: "y", 
        fill: false,
      },
      {
        type: "bar", // Bar chart for volume
        label: "Volume",
        data: filteredData.map((item) => parseFloat(item.volume.replace(/,/g, ""))), // Convert to numbers
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
        yAxisID: "y1", 
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Stock Market Data Visualization",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Close Price",
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Volume",
        },
        grid: {
          drawOnChartArea: false, 
        },
      },
    },
  };

  return (
    <div>
      <h1>Stock Market Data Visualization</h1>

     
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="tradeCode">Select Trade Code: </label>
        <select
          id="tradeCode"
          value={selectedTradeCode}
          onChange={(e) => setSelectedTradeCode(e.target.value)}
        >
          {tradeCodes.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons to toggle visualization type */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setVisualizationType("line")}>Line Chart (Close Price)</button>
        <button onClick={() => setVisualizationType("bar")}>Bar Chart (Volume)</button>
        <button onClick={() => setVisualizationType("multiAxis")}>Multi-Axis Chart</button>
      </div>

      {/* Render the selected visualization */}
      <div style={{ width: "800px", height: "400px", marginBottom: "40px" }}>
        {visualizationType === "line" ? (
          <>
            <h2>Close Price Over Time</h2>
            <Chart type="line" data={lineChartData} options={options} />
          </>
        ) : visualizationType === "bar" ? (
          <>
            <h2>Volume Over Time</h2>
            <Chart type="bar" data={barChartData} options={options} />
          </>
        ) : (
          <>
            <h2>Multi-Axis Chart</h2>
            <Chart type="bar" data={multiAxisChartData} options={options} />
          </>
        )}
      </div>

      {/* Table */}
      <div>
        <h2>Stock Data Table</h2>
        <table className="table table-bordered table-hover shadow-lg rounded">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Trade Code</th>
              <th>High</th>
              <th>Low</th>
              <th>Open</th>
              <th>Close</th>
              <th>Volume</th>
             
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.date}</td>
                <td>{item.trade_code}</td>
                <td>{item.high}</td>
                <td>{item.low}</td>
                <td>{item.open}</td>
                <td>{item.close}</td>
                <td>{item.volume}</td>
                

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
          <button key={i + 1} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChartData;