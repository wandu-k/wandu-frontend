import ReactPlayer from "react-player/lazy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useRef, useContext } from "react";
import Cookies from "js-cookie";
import Volume from "./Volume";
import TimeLine from "./TimeLine";

const ControllerUi = () => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    const savedVolume = Cookies.get("volume");
    return savedVolume !== undefined && !isNaN(parseFloat(savedVolume))
      ? parseFloat(savedVolume)
      : 1;
  }); // 볼륨 상태
  const [mute, setMute] = useState(false);
  const [nowPlayTime, setNowPlayTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);

  const handlePlayBtn = () => {
    if (playing === false) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  };

  useEffect(() => {
    if (volume === 0) {
      setMute(true);
    } else {
      setMute(false);
    }
  }, [volume]);

  return (
    <div>
      <div className="absolute hidden">
        <ReactPlayer
          url="https://wandukong.s3.ap-northeast-2.amazonaws.com/test.mp3"
          ref={playerRef}
          width="400px"
          height="50px"
          playing={playing}
          loop
          autoPlay={false}
          muted={mute}
          controls={false}
          volume={volume}
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
          onProgress={(progress) => setNowPlayTime(progress.playedSeconds)}
          onDuration={setDuration}
        ></ReactPlayer>
      </div>
      <div className="h-12 border px-8 flex content-center border-slate-100 shadow-light z-auto backdrop-blur-md bg-white/75 rounded-full gap-6">
        <button onClick={handlePlayBtn}>
          <FontAwesomeIcon
            icon={playing == false ? "fa-solid fa-play" : "fa-solid fa-pause"}
          />
        </button>
        <button>
          <FontAwesomeIcon icon="fa-solid fa-forward-step" />
        </button>
        <Volume volume={volume} setVolume={setVolume}></Volume>
        <TimeLine
          playing={playing}
          setPlaying={setPlaying}
          playerRef={playerRef}
          setNowPlayTime={setNowPlayTime}
          nowPlayTime={nowPlayTime}
          duration={duration}
        ></TimeLine>
      </div>
    </div>
  );
};

export default ControllerUi;
