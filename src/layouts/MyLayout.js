import { Outlet } from "react-router-dom";
import SideBar from "../components/navigation/SideBar";
import NavigationUi from "../components/navigation/NavigationUi";
import { ShopCategoryProvider } from "../contexts/ShopCategoryContext";

const MyLayout = () => {
  return (
    <>
      <div className="fixed z-10 w-dvw bg-white/80 backdrop-blur-3xl">
        <ShopCategoryProvider>
          <NavigationUi></NavigationUi>
        </ShopCategoryProvider>
      </div>
      <div className="flex container mx-auto relative">
        <Outlet></Outlet>
        <div className=" min-w-96 h-auto mt-20 mb-16">
          <SideBar></SideBar>
        </div>
      </div>
    </>
  );
};

export default MyLayout;
