import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import DataTable from './pages/DataTable';
import Hero from "./pages/Hero"
import 'antd/dist/reset.css';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/datatable" element={<DataTable />} />
    </Routes>
  </Router>
);

export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LandingPage from "./pages/LandingPage"; // we'll create this next

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
