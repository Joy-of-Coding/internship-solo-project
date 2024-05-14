import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//import { AuthProvider } from './AuthContext';
import Nav from './Nav';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      
        <Nav />
        <App />
      
    </BrowserRouter>
  </React.StrictMode>
);


// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// //import { store, useGlobalState } from "state-pool";
// import { BrowserRouter } from "react-router-dom";
// import Nav from "./Nav";
// //import { AuthProvider } from "./AuthContext";


// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
    
//       <BrowserRouter>
//         <Nav />
//         <App />
//       </BrowserRouter>
    
//   </React.StrictMode>
// );
