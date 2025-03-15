import React, { useState  } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateStock() {

const navigate = useNavigate();
const [inputs, setInputs] = useState([]);



const handleChange = (event) =>{
    const name = event.target.name
    const value = event.target.value
    setInputs(values => ({...values, [name]: value}));

}


const handleSubmit = (event) =>{

    event.preventDefault();
    axios.post('http://127.0.0.1:5001/InsertData', inputs).then(function(response){
        console.log(response.data);
         navigate('/');

        });

}




  return (
    <div>
        <div className="container h-100">
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                <h1>Create Stock</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label>Trade Date</label>
                      <input type="date" className="form-control" name="date" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label>Trade Code</label>
                      <input type="text" className="form-control" name="trade_code" onChange={handleChange} />
                    </div>  

                     <div className="mb-3">
                      <label>High</label>
                      <input type="text" className="form-control" name="high" onChange={handleChange} />
                    </div> 

                    <div className="mb-3">
                      <label>Low</label>
                      <input type="text" className="form-control" name="low" onChange={handleChange} />
                    </div> 

                    <div className="mb-3">
                      <label>Opening Price</label>
                      <input type="text" className="form-control" name="open" onChange={handleChange} />
                    </div> 

                    <div className="mb-3">
                      <label>Closing Price</label>
                      <input type="text" className="form-control" name="close" onChange={handleChange} />
                    </div> 

                    <div className="mb-3">
                      <label>Volume</label>
                      <input type="text" className="form-control" name="volume" onChange={handleChange} />
                    </div> 


                    <button type="submit" name="add" className="btn btn-primary">Save</button>
                </form>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    </div>
  )
}
