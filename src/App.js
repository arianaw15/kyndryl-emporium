import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';

function App() {
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
        <Route path="/" />
        {/* <Route path="/inputpage" element={<InputPage />} />
        <Route path="/userpage" element={<UserPage />} /> */}
      </Routes>
        </div>
      </Router>
    )
}

export default App;
