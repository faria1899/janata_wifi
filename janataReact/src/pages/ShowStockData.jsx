import React, { useEffect, useState } from "react";
import axios from "axios"
import {Link} from 'react-router-dom';


export default function ShowStockData() {

  
  const [users, setUsers] = useState([]);

  useEffect(() => {
      getStockData();
  }, []);


  function getStockData(){
    axios.get('http://127.0.0.1:5001/fetch/latest').then(function(response) {
      console.log(response.data);
      setUsers(response.data);

  });

  }



  const deleteStock = (id) => {
    axios.delete(`http://127.0.0.1:5001/delete/${id}`).then(function(response){
        console.log(response.data);
        getStockData();
    });
    alert("Confirm Delete?");
}


const handleDelete = (id) => {
 
  const isConfirmed = window.confirm("Are you sure you want to delete this stock?");
  
  if (isConfirmed) {
      deleteStock(id); 
};
}
 

  return (
    <div>
        <div className='container h-100'>
            <div className='row h-100'>
                <div className='col-12'>
                <p><Link to="/addnewStock" className="btn btn-success">Add New Stock</Link> </p>
                <h1>List Users</h1>
                <table className='table table-bordered table-striped'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Trade Date</th>
                      <th>Trade Code</th>
                      <th>High</th>
                      <th>Low</th>
                      <th>Opening Price</th>
                      <th>closing Price</th>
                      <th>Volume</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((item, key)=>
                        <tr key={key}>
                            <td>{item.id}</td>
                            <td>{item.date}</td>
                            <td>{item.trade_code}</td>
                            <td>{item.high}</td>
                            <td>{item.low}</td>
                            <td>{item.open}</td>
                            <td>{item.close}</td>
                            <td>{item.volume}</td>
                            <td>
                               <Link to={`data/${item.id}/edit`} className="btn btn-success" style={{marginRight: "10px"}}>Edit</Link>
                               <button onClick={() => handleDelete(item.id)} className="btn btn-danger"> Delete </button>

                            </td>

                        </tr>
                      
                      )} 
                  </tbody>
                </table>

                </div>

            </div>

        </div>

    </div>

  )
}
