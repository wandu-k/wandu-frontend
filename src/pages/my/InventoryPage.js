import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";

const InventoryPage = () => {
  const navigate = useNavigate();
  const { userInfo, isLogin } = useContext(LoginContext);

  useEffect(() => {
    if (!isLogin) {
      navigate(`/login`);
    }
  }, [isLogin]);
};

export default InventoryPage;
