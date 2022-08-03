import React from "react";
import { Navigate } from "react-router-dom";

type RequireAuthProps = {
  children: JSX.Element;
};

function RequireAuth({ children }: RequireAuthProps) {
  const nowDate = new Date().getTime() + 1000;

  if (JSON.parse(localStorage.getItem("token")) != null) {
    {
      if (nowDate > Number(JSON.parse(localStorage.getItem("token")).expire)) {
        alert("Your login has expired.");
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        return <Navigate to="/" />;
      }
      return children;
    }
  }
  alert("Login is required.");
  return <Navigate to="/" />;
}

export default RequireAuth;
