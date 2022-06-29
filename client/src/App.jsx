import React, {useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import {HomePage, ShiftPage} from './components/index'

function App() {

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
            </ul>
          </nav>
          <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/shift-updates" element={<ShiftPage />}/>
      </Routes>
        </div>
      </Router>
    )
}

export default App;
