import { Navigate } from "react-router-dom";

import { useAuthentication } from "../services/AuthContext";

export default function PrivateRoutes({ children }) {
  const { session } = useAuthentication();

  return session ? <>{children}</> : <Navigate to="/signup" />;
}
