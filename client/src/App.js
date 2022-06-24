import React, {useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import {HomePage} from './components/index'
// import {useDispatch} from 'react-redux'
// import {getEmployees} from './actions/employees'

function App() {
  // const dispatch = useDispatch()

  // useEffect(()=> {
  //   dispatch(getEmployees());
  // }, [])

  return (
      <Router basename=''>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav>
          <Routes>
        <Route path="/" element={<HomePage />}/>
        {/* <Route path="/inputpage" element={<InputPage />} />
        <Route path="/userpage" element={<UserPage />} /> */}
      </Routes>
        </div>
      </Router>
    )
}

export default App;
