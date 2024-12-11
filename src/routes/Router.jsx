import { BrowserRouter, Route, Routes } from "react-router-dom";

import PrivateRoutes from "./PrivateRoutes";

import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";
import Home from "../views/Home";
import Form from "../views/Form";
import Settings from "../views/Settings";
import Dashboard from "../views/Dashboard";

import { useAuthentication } from "../services/AuthContext";

export default function Router() {
  const { session } = useAuthentication();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/"
          element={
            <PrivateRoutes isAuthenticated={session}>
              <Home />
            </PrivateRoutes>
          }
        />
        <Route
          path="/form"
          element={
            <PrivateRoutes isAuthenticated={session}>
              <Form />
            </PrivateRoutes>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoutes isAuthenticated={session}>
              <Settings />
            </PrivateRoutes>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoutes isAuthenticated={session}>
              <Dashboard />
            </PrivateRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
