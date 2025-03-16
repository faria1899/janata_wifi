import React ,{} from 'react'
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ShowStockData from "./pages/ShowStockData"
import CreateStock from './pages/CreateStock';
import EditStock from "./pages/EditStock"
import ChartData from "./pages/ChartData"

function App() {
  return (
    <div className="vh-100 gradient-custom">
    <div className="container">
    <h1 className="header">
      React-JS & Python Flask CRUD with MySQL
    </h1>
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<ShowStockData/>}/>
          <Route path="/addnewStock" element = {<CreateStock/>}/>
          <Route path="/data/:id/edit" element = {<EditStock/>}/>
          <Route path="/chart" element = {<ChartData/>}/>

          
            
        </Routes>
      </BrowserRouter>
    </div>
    </div>
  );
}
    
export default App;