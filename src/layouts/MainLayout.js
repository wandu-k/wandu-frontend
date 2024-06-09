import NavigationUi from "../components/navigation/NavigationUi";
import ControllerUi from "../components/music/controller/ControllerUi";
import { Outlet } from "react-router-dom";
import { ShopCategoryProvider } from "../contexts/ShopCategoryContext";
import { MiniHomeProvider } from "../contexts/MiniHomeContext";

const MainLayout = () => {
  return (
    <>
      <div className="dark:bg-zinc-900 w-dvw h-auto dark:text-white">
        <MiniHomeProvider>
          <div className="fixed top-0 z-30 w-dvw bg-white/80 dark:bg-zinc-900/80 backdrop-blur-3xl">
            <ShopCategoryProvider>
              <NavigationUi></NavigationUi>
            </ShopCategoryProvider>
          </div>
          <div className="flex container mx-auto relative z-10">
            <Outlet></Outlet>
          </div>
          <ControllerUi></ControllerUi>
        </MiniHomeProvider>
      </div>
    </>
  );
};

export default MainLayout;
