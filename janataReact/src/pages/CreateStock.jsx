import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

export default function CreateStock() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://127.0.0.1:5001/InsertData", inputs).then((response) => {
      console.log(response.data);
      setShowModal(true);
    });
  };

  const handleClose = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: "#f0f8ff" }}>
      <div className="card shadow-lg p-4" style={{ width: "50%", borderRadius: "12px", backgroundColor: "#ffffff" }}>
        <h2 className="text-center mb-4" style={{ color: "#007bff" }}>Create Stock</h2>
        <form onSubmit={handleSubmit}>
          {[
            { label: "Trade Date", type: "date", name: "date" },
            { label: "Trade Code", type: "text", name: "trade_code" },
            { label: "High", type: "text", name: "high" },
            { label: "Low", type: "text", name: "low" },
            { label: "Opening Price", type: "text", name: "open" },
            { label: "Closing Price", type: "text", name: "close" },
            { label: "Volume", type: "text", name: "volume" },
          ].map((field, index) => (
            <div className="mb-3" key={index}>
              <label className="form-label fw-bold" style={{ color: "#333" }}>{field.label}</label>
              <input
                type={field.type}
                className="form-control"
                name={field.name}
                onChange={handleChange}
                required
                style={{ borderColor: "#007bff" }}
              />
            </div>
          ))}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-lg shadow-sm" style={{ backgroundColor: "#007bff", borderColor: "#0056b3" }}>Save</button>
          </div>
        </form>
      </div>

     
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Stock has been added successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>OK</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
