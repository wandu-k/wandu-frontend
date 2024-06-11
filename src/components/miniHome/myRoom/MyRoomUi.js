import React, { useContext, useEffect, useRef } from "react";
import main from "../../../images/myroom/main.jpg";
import AvatarUi from "../../avatar/AvatarUi";

const MyRoomUi = ({ userId, miniHome }) => {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-2xl">
      <img
        src={main}
        alt="background"
        className=" inset-0 w-full h-full object-cover absolute -z-50"
      ></img>
      <div className=" absolute bottom-0 right-0 left-0 mx-auto w-64 h-64">
        <AvatarUi userId={userId}></AvatarUi>
      </div>
      <div className="absolute m-4 p-2 px-4 text-white bottom-0 bg-black/75 w-auto rounded-full leading-4 tracking-tighter font-bold text-xs">
        <div className="flex justify-between">
          <label>오늘 방문자</label>
          <div>{miniHome?.hpToday}</div>
        </div>
        <div className="flex justify-between gap-6">
          <label>누적 방문자</label>
          <div>{miniHome?.allVisit}</div>
        </div>
      </div>
    </div>
  );
};

export default MyRoomUi;
