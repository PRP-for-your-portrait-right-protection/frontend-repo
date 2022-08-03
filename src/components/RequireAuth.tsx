import React from "react";
import { Navigate } from "react-router-dom";

//향후 로그인 children 타입 확인 필요

type RequireAuthProps = {
  children: JSX.Element;
};

function RequireAuth({ children }: RequireAuthProps) {
  if (JSON.parse(localStorage.getItem("token")) == null) {
    {
      alert("Your login has expired.");
    }
    return <Navigate to="/" />;
  }
  return children;
}

export default RequireAuth;
