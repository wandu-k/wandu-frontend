import React, { useContext, useEffect, useRef } from "react";

const MyRoomUi = () => {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-2xl">
      <img
        src="https://img.freepik.com/free-photo/view-room-interior-with-furniture-copy-space_23-2150680550.jpg?t=st=1716429732~exp=1716433332~hmac=c534d26506dba45adda692a3c64e88b8e4ec09a8adf0d09ed90516a0abb6514c&w=2000"
        alt="background"
        className=" inset-0 w-full h-full object-cover absolute"
      ></img>
      <div className="absolute m-4 p-2 px-4 text-white bottom-0 bg-black/75 w-auto rounded-full leading-4 tracking-tighter font-bold text-xs">
        <div className="flex justify-between">
          <label>오늘 방문자</label>
          <div></div>
        </div>
        <div className="flex justify-between gap-6">
          <label>누적 방문자</label>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default MyRoomUi;
