import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Chat } from "./features/chat/chat";
import { Auth } from "./features/auth/auth";
import { useAppDispatch, useAppSelector } from "./app/hook";
import { getUserInfo } from "./utils/slices/userSlice";

const PrivateRoute = ({ children }) => {
  const userInfo = useAppSelector((state) => state.user);
  const isAuthenticated = !!userInfo?.user?.token;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({ children }) => {
  const userInfo = useAppSelector((state) => state.user);
  const isAuthenticated = !!userInfo?.user?.token;
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};

function App() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getUserData = async () => {
      try {
        dispatch(getUserInfo());
      } catch (error) {
        console.log(error);
      }
    };
    if (!user) getUserData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
