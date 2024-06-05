import { Outlet } from "react-router-dom";
import SideBar from "../components/navigation/SideBar";
import { LoginContext } from "../contexts/LoginContext";
import { useContext } from "react";

const ProfileLayout = () => {
  const { userInfo, isLogin } = useContext(LoginContext);
  return (
    <>
      <Outlet></Outlet>
      <div className=" min-w-96 h-dvh pt-20 pb-16 sticky top-0">
        <SideBar userInfo={userInfo}></SideBar>
      </div>
    </>
  );
};

export default ProfileLayout;
