import MyRoomUi from "../components/miniHome/myRoom/MyRoomUi";

import MiniHomeApi from "../components/miniHome/MiniHomeApi";

const MainPage = () => {
  return (
    <>
      <MiniHomeApi>
        {" "}
        <MyRoomUi></MyRoomUi>
      </MiniHomeApi>
    </>
  );
};

export default MainPage;
