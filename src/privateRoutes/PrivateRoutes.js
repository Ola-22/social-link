import { Navigate } from "react-router-dom";

function PrivateRoutes({ children }) {
  JSON.parse(localStorage.getItem("user"));

  if (!JSON.parse(localStorage.getItem("user"))) {
    return <Navigate to="/" />;
  }
  if (JSON.parse(localStorage.getItem("user"))) {
    return children;
  }
}

export default PrivateRoutes;
