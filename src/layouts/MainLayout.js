import NavigationUi from "../components/navigation/NavigationUi";
import CalendarUi from "../components/calendar/CalendarUi";
import ControllerUi from "../components/music/controller/ControllerUi";
import { MusicProvider } from "../contexts/MusicContext";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div className="flex flex-col w-72 gap-4">
        {" "}
        <div className="h-full border border-slate-100 shadow-light z-auto backdrop-blur-md bg-white/75 rounded-2xl"></div>
        <div className="border border-slate-100 shadow-light z-auto backdrop-blur-md bg-white/75 rounded-2xl">
          <CalendarUi></CalendarUi>
        </div>
      </div>
      <div className="flex flex-col w-full h-full gap-4">
        <Outlet />
        <MusicProvider>
          <ControllerUi></ControllerUi>
        </MusicProvider>
      </div>
      <div className="flex flex-col justify-between">
        <NavigationUi></NavigationUi>
        <div className="h-20 w-20 border border-slate-100 shadow-light z-auto backdrop-blur-md bg-white/75 rounded-full"></div>
      </div>
    </>
  );
};

export default MainLayout;
