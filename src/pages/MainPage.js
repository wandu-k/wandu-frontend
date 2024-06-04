import MyRoomUi from "../components/miniHome/myRoom/MyRoomUi";

import MiniHomeApi from "../components/miniHome/MiniHomeApi";

const MainPage = () => {
  return (
    <>
      <MiniHomeApi>
        {" "}
        <div className="w-full h-dvh pt-24 pb-20 px-4 rounded-2xl overflow-hidden">
          <MyRoomUi></MyRoomUi>
        </div>
      </MiniHomeApi>
    </>
  );
};

export default MainPage;
