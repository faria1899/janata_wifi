import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

import "../App.css";

export default function ShowStockData() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getStockData();
  }, []);

  function getStockData() {
    axios.get('http://127.0.0.1:5001/fetch/latest').then(function (response) {
      console.log(response.data);
      setUsers(response.data);
    });
  }


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const deleteStock = (id) => {
    axios.delete(`http://127.0.0.1:5001/delete/${id}`).then(function (response) {
      console.log(response.data);
      getStockData();
    });
    alert("Confirm Delete?");
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this stock?");
    if (isConfirmed) {
      deleteStock(id);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
          <Link to="/chart" className="btn2 btn2 active no-underline">
               Chart
            </Link>

            <Link to="/addnewStock" className="btn2 btn2 hover no-underline">
               Add New Stock
            </Link>
          </div>

          <table className="table table-bordered table-hover shadow-lg rounded">
            <thead style={{ background: 'linear-gradient(135deg, #6a11cb, #2575fc)', color: 'white' }}>
              <tr>
                <th>ID</th>
                <th>Trade Date</th>
                <th>Trade Code</th>
                <th>High</th>
                <th>Low</th>
                <th>Opening Price</th>
                <th>Closing Price</th>
                <th>Volume</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, key) => (
                <tr key={key} className="table-light hover-table">
                  <td className="text-center p-3">{item.id}</td>
                  <td className="text-center p-3">{formatDate(item.date)}</td>
                  <td className="text-center p-3">{item.trade_code}</td>
                  <td className="text-center p-3">{item.high}</td>
                  <td className="text-center p-3">{item.low}</td>
                  <td className="text-center p-3">{item.open}</td>
                  <td className="text-center p-3">{item.close}</td>
                  <td className="text-center p-3">{item.volume}</td>
                  <td className="text-center p-3">
                    <Link
                      to={`data/${item.id}/edit`}
                      className="btn btn-outline-success mx-1"
                      style={{ minWidth: '80px' }}
                    >
                      <i className="fas fa-edit"></i> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-outline-danger mx-1"
                      style={{ minWidth: '80px' }}
                    >
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

