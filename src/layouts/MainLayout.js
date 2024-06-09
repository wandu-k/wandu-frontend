import NavigationUi from "../components/navigation/NavigationUi";
import ControllerUi from "../components/music/controller/ControllerUi";
import { Outlet } from "react-router-dom";
import { ShopCategoryProvider } from "../contexts/ShopCategoryContext";

const MainLayout = () => {
  return (
    <>
      <div className="fixed top-0 z-30 w-dvw bg-white/80 backdrop-blur-3xl">
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
