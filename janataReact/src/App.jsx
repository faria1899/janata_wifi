import React ,{} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ShowStockData from "./pages/ShowStockData"
import CreateStock from './pages/CreateStock';
import EditStock from "./pages/EditStock"

function App() {
  return (
    <div className="vh-100 gradient-custom">
    <div className="container">
      <h1 className="page-header text-center">React-JS and Python Flask CRUD Create, Read, Update and Delete MySql-Database</h1>

    
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<ShowStockData/>}/>
          <Route path="/addnewStock" element = {<CreateStock/>}/>
          <Route path="/data/:id/edit" element = {<EditStock/>}/>
          
            
        </Routes>
      </BrowserRouter>
    </div>
    </div>
  );
}
    
export default App;