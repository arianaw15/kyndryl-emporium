import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";
import './App.css';
import {HomePage, ShiftUpdatePage, EmployeesPage, EmployeePage} from './components/index'

function App() {
  const [employees, setEmployees] = useState([]);

    useEffect(() => {
       getEmployees()
    }, [])

  async function getEmployees(){
    axios.get('/api/employees')
    .then((res) => setEmployees(res.data))
    .catch(err => console.log(err))
}

  return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
              <Link to="/shift-updates">Shift Updates</Link>
              </li>
              <li>
              <Link to="/employeeList">Employees</Link>
              </li>
            </ul>
          </nav>
          <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/shift-updates" element={<ShiftUpdatePage />}/>
        <Route path="/employeeList" element={<EmployeesPage />}/>
      </Routes>
      <Outlet />
        </div>
      </Router>
    )
}

export default App;
