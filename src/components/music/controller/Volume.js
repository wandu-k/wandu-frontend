import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
const Volume = ({ volume, setVolume }) => {
  const [isDragging, setIsDragging] = useState(false);

  const volumeBarRef = useRef(null);

  const handleVolumeBarMouseDown = (e) => {
    setIsDragging(true);
    updateVolume(e.clientX);
  };

  const updateVolume = (clientX) => {
    const rect = volumeBarRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const width = rect.width;
    const newVolume = Math.min(1, Math.max(0, offsetX / width));
    setVolume(newVolume);
    Cookies.set("volume", newVolume, { expires: 7 }); // 쿠키에 볼륨 값 저장, 7일 유효기간 설정}
  };

  const handleMouseUp = (e) => {
    setIsDragging(false);
  };
  const handleMouseMove = (e) => {
    if (isDragging) {
      updateVolume(e.clientX);
    }
  };

  useEffect(() => {
    document.body.addEventListener("mouseup", handleMouseUp);

    document.body.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.body.removeEventListener("mouseup", handleMouseUp);
      document.body.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging]);

  const handleMuteBtn = () => {
    if (volume == 0) {
      const savedVolume = Cookies.get("volume");
      setVolume(parseFloat(savedVolume));
      if (savedVolume !== undefined) {
        if (savedVolume == 0) {
          setVolume(1);
          Cookies.set("volume", savedVolume, { expires: 7 }); // 쿠키에 볼륨 값 저장, 7일 유효기간 설정
        }
      }
    } else {
      setVolume(0); // 볼륨을 0으로 설정하여 음소거
    }
  };

  return (
    <>
      <button onClick={handleMuteBtn}>
        {/* 볼륨 상태에 따라 다른 아이콘 표시 */}
        <FontAwesomeIcon
          icon={
            volume === 0
              ? "fa-solid fa-volume-mute"
              : volume < 0.3
              ? "fa-solid fa-volume-low"
              : "fa-solid fa-volume-high"
          }
        />
      </button>
      <div className="flex flex-col justify-center items-center">
        <div
          ref={volumeBarRef}
          className="w-16 h-2 bg-gray-200 rounded-full cursor-pointer relative "
          onMouseDown={handleVolumeBarMouseDown}
        >
          {/* 볼륨 바 */}
          <div
            className="h-full bg-lime-500 rounded-full "
            style={{ width: `${volume * 100}%` }}
          ></div>
          {/* 동그란 핸들 */}
          <div
            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white rounded-full w-4 h-4 shadow border border-gray-200 cursor-pointer"
            style={{ left: `${volume * 100}%` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Volume;
