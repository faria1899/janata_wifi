import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditStock() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getStock();
  }, []);

  function getStock() {
    axios.get(`http://127.0.0.1:5001/fetchSingle/${id}`).then(function (response) {
      
      const formattedDate = new Date(response.data.date).toISOString().split('T')[0];
      setInputs({
        ...response.data,
        date: formattedDate,
      });
    });
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://127.0.0.1:5001/updateId/${id}`, inputs).then(function (response) {
      navigate('/');
    });
  };

  return (
    <div>
      <div className="container h-100">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <h1>Edit Stock</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Trade Date</label>
                <input
                  type="date"
                  value={inputs.date || ""}
                  className="form-control"
                  name="date"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Trade Code</label>
                <input
                  type="text"
                  value={inputs.trade_code || ""}
                  className="form-control"
                  name="trade_code"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>High</label>
                <input
                  type="text"
                  value={inputs.high || ""}
                  className="form-control"
                  name="high"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>Low</label>
                <input
                  type="text"
                  value={inputs.low || ""}
                  className="form-control"
                  name="low"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>Opening Price</label>
                <input
                  type="text"
                  value={inputs.open || ""}
                  className="form-control"
                  name="open"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>Closing Price</label>
                <input
                  type="text"
                  value={inputs.close || ""}
                  className="form-control"
                  name="close"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>Volume</label>
                <input
                  type="text"
                  value={inputs.volume || ""}
                  className="form-control"
                  name="volume"
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </div>
  );
}