import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import UserContext from "./context/UserContext";
import store from "./redux/store";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <UserContext>
      <div className="bg-[rgba(0,0,0,0.9)] w-screen">
        <App />
      </div>
    </UserContext>
  </Provider>
);
