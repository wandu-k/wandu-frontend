import { useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";
import { useContext, useEffect, useState } from "react";

const LogoutPage = () => {
  const { logout } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/login");
  }, []);

  return <></>;
};

export default LogoutPage;
