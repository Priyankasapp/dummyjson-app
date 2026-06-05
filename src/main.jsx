// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { ProductContextProvider } from "./context/ProductContext.jsx";
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";

// createRoot(document.getElementById("root")).render(
//   <BrowserRouter>
//     {/* <ProductContextProvider>
//       <App />
//     </ProductContextProvider> */}
//     <Provider>
//       <App/>
//     </Provider>
//   </BrowserRouter>
// );

// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./app/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);