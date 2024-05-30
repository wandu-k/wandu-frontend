import NavigationUi from "../components/navigation/NavigationUi";
import ControllerUi from "../components/music/controller/ControllerUi";
import { LoginContext } from "../contexts/LoginContext";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import SideBar from "../components/navigation/SideBar";

const MainLayout = () => {
  const { userInfo } = useContext(LoginContext);

  const isPc = useMediaQuery({
    query: "(min-width:1024px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  return (
    <>
      <div className="h-dvh flex flex-col">
        <div className="fixed z-10 w-dvw backdrop-blur-3xl bg-white/90">
          <NavigationUi></NavigationUi>
        </div>
        <div className="flex h-full w-full">
          <div className="flex w-dvw">
            <Outlet></Outlet>
            <div className="w-96 pt-20">
              <SideBar></SideBar>
            </div>
          </div>
          <ControllerUi></ControllerUi>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
