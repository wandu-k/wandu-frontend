import NavigationUi from "../components/navigation/NavigationUi";
import ControllerUi from "../components/music/controller/ControllerUi";
import { LoginContext } from "../contexts/LoginContext";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import SideBar from "../components/navigation/SideBar";
import { ShopCategoryProvider } from "../contexts/ShopCategoryContext";

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
      <div className="fixed z-10 w-dvw bg-white/80 backdrop-blur-3xl">
        <ShopCategoryProvider>
          <NavigationUi></NavigationUi>
        </ShopCategoryProvider>
      </div>
      <div className="flex container mx-auto relative">
        <Outlet></Outlet>
      </div>

      <ControllerUi></ControllerUi>
    </>
  );
};

export default MainLayout;
