import MyRoomUi from "../components/miniHome/myRoom/MyRoomUi";
import NavigationUi from "../components/navigation/NavigationUi";
import CalendarUi from "../components/calendar/CalendarUi";
import ControllerUi from "../components/music/controller/ControllerUi";
import AvatarUi from "../components/avatar/AvatarUi";
import { MiniHomeProvider } from "../contexts/MiniHomeContext";
import { MusicProvider } from "../contexts/MusicContext";

const MainPage = () => {
  return (
    <div className="container flex my-auto mx-auto p-10 h-dvh gap-4">
      <MiniHomeProvider>
        <div className="flex flex-col w-72 gap-4">
          {" "}
          <div className="h-full border border-slate-100 shadow-light z-auto backdrop-blur-md bg-white/75 rounded-2xl"></div>
          <div className="border border-slate-100 shadow-light z-auto backdrop-blur-md bg-white/75 rounded-2xl">
            <CalendarUi></CalendarUi>
          </div>
        </div>
        <div className="flex flex-col w-full h-full gap-4">
          <div className="flex w-full h-full gap-4">
            <div className="flex flex-col w-full gap-4">
              <MyRoomUi></MyRoomUi>
              <div className="flex gap-4 h-96">
                <div className="w-full border border-slate-100 shadow-light z-auto backdrop-blur-md bg-white/75 rounded-2xl"></div>
                <div className="w-full border border-slate-100 shadow-light z-auto backdrop-blur-md bg-white/75 rounded-2xl"></div>
              </div>
            </div>
            <div className="w-96 border border-slate-100 shadow-light z-auto backdrop-blur-md bg-white/75 rounded-2xl md:hidden xl:block"></div>
          </div>

          <MusicProvider>
            <ControllerUi></ControllerUi>
          </MusicProvider>
        </div>
        <div className="flex flex-col justify-between">
          <NavigationUi></NavigationUi>
          <div className="h-20 w-20 border border-slate-100 shadow-light z-auto backdrop-blur-md bg-white/75 rounded-full"></div>
        </div>
      </MiniHomeProvider>
    </div>
  );
};

export default MainPage;
