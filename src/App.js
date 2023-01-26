import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import ReportedPosts from "./Pages/ReportsPost";
import PrivateRoutes from "./privateRoutes/PrivateRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>
          }
        />
        <Route
          path="/posts-reports"
          element={
            <PrivateRoutes>
              <ReportedPosts />
            </PrivateRoutes>
          }
        />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </>
  );
}

export default App;
