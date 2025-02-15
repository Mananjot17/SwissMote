import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage.jsx";
import "./App.css";
import Dashboard from "./pages/Dashboard.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import { useAuthContext } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import UpdateEvent from "./pages/UpdateEvent.jsx";

const App = () => {
  const { authUser } = useAuthContext();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <AuthPage type="login" />}
        />
        <Route
          path="/register"
          element={
            authUser ? <Navigate to="/" /> : <AuthPage type="register" />
          }
        />
        <Route
          path="/events/create-event"
          element={authUser ? <CreateEvent /> : <Navigate to="/login" />}
        />
        <Route
          path="/events/:id/edit"
          element={authUser ? <UpdateEvent /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
