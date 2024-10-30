import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import React from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import { SocketProvider } from "./context/SocketContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <App />
      </SocketProvider>
    </Provider>
  </StrictMode>
);
