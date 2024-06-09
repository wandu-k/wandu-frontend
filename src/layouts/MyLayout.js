import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../components/navigation/SideBar";
import NavigationUi from "../components/navigation/NavigationUi";
import { ShopCategoryProvider } from "../contexts/ShopCategoryContext";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/LoginContext";
import axios from "axios";
import MySideBar from "../components/navigation/MySideBar";
import ControllerUi from "../components/music/controller/ControllerUi";

const MyLayout = () => {
  const navigate = useNavigate();
  const { userInfo, isLogin } = useContext(LoginContext);
  const [initialized, setInitialized] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (initialized && !isLogin) {
      navigate(`/login`);
    }
  }, [initialized, isLogin, navigate]);

  useEffect(() => {
    if (!isLogin) {
      // isLogin 정보가 준비될 때까지 대기
      return;
    }

    // isLogin 정보가 준비되면 초기화 완료로 표시
    setInitialized(true);
  }, [isLogin]); // isLogin이 변경될 때마다 실행

  return (
    <>
      <div className="flex container mx-auto relative">
        <Outlet context={userInfo}></Outlet>
        <div className=" min-w-96 h-dvh pt-20 pb-16 sticky top-0">
          <MySideBar userInfo={userInfo} />
        </div>
      </div>
    </>
  );
};

export default MyLayout;
