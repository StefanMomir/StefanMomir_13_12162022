import React, { useEffect } from "react";
import Users from "../pages/User.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Home from "../pages/Index.jsx";
import { Outlet, Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn.jsx";
import { useSelector } from "react-redux";

const MainRoutes = () => {
  const { user, isError, isSuccess } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isError) {
      console.log("Error:" + isError);
    }
    if (isSuccess) {
      console.log("Success:" + isSuccess);
    }
  }, [isError, isSuccess, user]);

  const ProtectedRoutes = ({ children }) => {
    return user ? children : <SignIn />;
  };

  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route
        path="/profile"
        exact
        element={
          <ProtectedRoutes>
            <Outlet />
          </ProtectedRoutes>
        }
      >
        <Route path="*" element={<Home />} />
        <Route path="/profile" exact element={<Dashboard />} />
        {/*<Route path="/dashboard/:id" exact element={<Users />} />*/}
      </Route>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<SignIn />} />
    </Routes>
  );
};

export default MainRoutes;
