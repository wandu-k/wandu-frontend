import { LoginContext } from "../contexts/LoginContext";
import { useContext, useEffect, useState } from "react";

const LogoutPage = () => {
  const { logout } = useContext(LoginContext);

  useEffect(() => {
    logout();
  }, []);

  return <></>;
};

export default LogoutPage;
