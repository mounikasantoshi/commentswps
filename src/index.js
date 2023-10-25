import React from "react";
//import ReactDOM from "react-dom";
import {createRoot} from 'react-dom/client';

import App from "./App";
import "./index.css";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

//const container = document.getElementById('root');

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

//ReactDOM.render(<App />, container);

