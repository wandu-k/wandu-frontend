import MyRoom from "../components/miniHome/myRoom/MyRoom";
import CalendarUi from "../components/calendar/CalendarUi";
import AvatarUi from "../components/avatar/AvatarUi";
import { MiniHomeProvider } from "../contexts/MiniHomeContext";

const MainPage = () => {
  return (
    <div className="container flex my-auto mx-auto p-10 h-dvh gap-4">
      <MiniHomeProvider>
        <div className="flex flex-col w-72 gap-4">
          {" "}
          <div className="border-2 h-full"></div>
          <div className="border-2">
            <CalendarUi></CalendarUi>
          </div>
        </div>
        <div className="flex flex-col w-full h-full gap-4">
          <div className="border-2 flex w-full h-full gap-4">
            <div className="flex flex-col w-full gap-4">
              <div className="border-2 h-full">
                <MyRoom></MyRoom>
              </div>
              <div className="border-2 flex gap-4 h-96">
                <div className="border-2 w-1/2"></div>
                <div className="border-2 w-1/2"></div>
              </div>
            </div>
            <div className="border-2 w-96">fdfd</div>
          </div>
          <div className="border-2">dfd</div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="border-2 h-96 w-20">fdfd</div>
          <div className="border-2 h-20 w-20">fdfd</div>
        </div>
      </MiniHomeProvider>
    </div>
  );
};

export default MainPage;
