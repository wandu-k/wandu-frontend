import { MiniHomeContext } from "../../../contexts/MiniHomeContext";
import React, { useContext, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";

const MyRoomUi = () => {
  const miniHomeInfo = useContext(MiniHomeContext); // 컨텍스트 값을 가져옴
  const canvasRef = useRef();

  console.log(miniHomeInfo);
  console.log(typeof miniHomeInfo);

  return (
    <div className="w-full h-full border border-slate-100 shadow-light z-auto backdrop-blur-md bg-white/75 rounded-2xl">
      <div className="w-full h-full" ref={canvasRef}>
        <Canvas resize={{ debounce: 0 }}>
          <mesh>
            <boxGeometry args={[1, 1, 1]}></boxGeometry>
            <meshStandardMaterial color="hotpink" transparent />
          </mesh>
        </Canvas>
      </div>
      <div className="absolute bottom-0 m-4 p-2 px-4 text-white bg-black opacity-75 w-auto rounded-full leading-4 tracking-tighter font-bold text-xs">
        <div className="flex justify-between">
          <label>오늘 방문자</label>
          <div>{miniHomeInfo?.hpToday}</div>
        </div>
        <div className="flex justify-between gap-6">
          <label>누적 방문자</label>
          <div>{miniHomeInfo?.allVisit}</div>
        </div>
      </div>
    </div>
  );
};

export default MyRoomUi;
