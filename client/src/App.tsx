import "./App.css";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Chat } from "./pages/chat";
import { Auth } from "./pages/auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
