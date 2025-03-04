import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { auth } = useSelector((store) => store.authReducer);
  const token = localStorage.getItem("token");

  // return auth ? children : <Navigate to="/login" replace />;
  return auth || token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
