import React, { useRef, useState, useEffect } from "react";

const TimeLine = ({
  nowPlayTime,
  duration,
  setNowPlayTime,
  playerRef,
  playing,
  setPlaying,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [timeLineBarTransClass, setTimeLineBarTransClass] =
    useState("duration-1000"); // 초기 클래스 설정
  const timeLineBarRef = useRef(null);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleTimeLineBarMouseDown = (d) => {
    setTimeLineBarTransClass("duration-100"); // 클래스 변경
    //toggleDragging(true);
    setIsDragging(true);
    updateNowPlayTime(d.clientX);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setPlaying(true);
    }
    setTimeLineBarTransClass("duration-1000"); // 클래스 변경
    setIsDragging(false);
    //toggleDragging(false);
    console.log("sdsdss");
  };
  const handleMouseMove = (d) => {
    if (isDragging) {
      setTimeLineBarTransClass("duration-0"); // 클래스 변경
      updateNowPlayTime(d.clientX);
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

  const updateNowPlayTime = (clientX) => {
    setPlaying(false);
    const rect = timeLineBarRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const width = rect.width;
    const newNowPlayTime = Math.min(1, Math.max(0, offsetX / width));
    setNowPlayTime(newNowPlayTime * duration);
    playerRef.current.seekTo(newNowPlayTime);
  };

  return (
    <>
      <div className="w-full flex items-center gap-4">
        <div className="font-bold">{formatTime(nowPlayTime)}</div>
        <div
          ref={timeLineBarRef}
          className="w-full h-2 bg-gray-200 rounded-full cursor-pointer relative "
          onMouseDown={handleTimeLineBarMouseDown}
        >
          {/* 볼륨 바 */}
          <div
            className={`h-full w-0 bg-lime-500 rounded-full transition-all ease-linear ${timeLineBarTransClass} `}
            style={{
              width: `${(nowPlayTime / duration) * 100}%`,
            }}
          ></div>
          {/* 동그란 핸들 */}
          <div
            className={`absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white rounded-full w-4 h-4 shadow border border-gray-200 cursor-pointer transition-all ease-linear ${timeLineBarTransClass}`}
            style={{
              left: `${(nowPlayTime / duration) * 100}%`,
            }}
          ></div>
        </div>
        <div className="font-bold">{formatTime(duration)}</div>
      </div>
    </>
  );
};
export default TimeLine;

{
  /**/
}
{
  /*style={{ left: `${volume * 100}%` }}*/
}
