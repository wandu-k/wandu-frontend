import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../components/navigation/SideBar";
import NavigationUi from "../components/navigation/NavigationUi";
import { ShopCategoryProvider } from "../contexts/ShopCategoryContext";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/LoginContext";
import axios from "axios";
import MySideBar from "../components/navigation/MySideBar";

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

  useEffect(() => {
    if (isLogin) {
      axios
        .get(`http://localhost:7090/api/user/${userInfo.userId}/inventory`, {
          headers: { Authorization: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          console.log(response.data);
          setItems(response.data.dtoList);
        })
        .catch((error) => {});
    }
  }, [isLogin]);

  return (
    <>
      <div className="fixed z-10 w-dvw bg-white/80 backdrop-blur-3xl">
        <ShopCategoryProvider>
          <NavigationUi></NavigationUi>
        </ShopCategoryProvider>
      </div>
      <div className="flex container mx-auto relative">
        <Outlet context={userInfo}></Outlet>
        <div className=" min-w-96 h-auto mt-20 mb-16">
          <MySideBar userInfo={userInfo} />
        </div>
      </div>
    </>
  );
};

export default MyLayout;
