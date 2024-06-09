import React, { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player/lazy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import Volume from "./Volume";
import TimeLine from "./TimeLine";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
const ControllerUi = () => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    const savedVolume = Cookies.get("volume");
    return savedVolume !== undefined && !isNaN(parseFloat(savedVolume))
      ? parseFloat(savedVolume)
      : 1;
  });
  const [mute, setMute] = useState(volume === 0);
  const [nowPlayTime, setNowPlayTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);
  const [musicPanel, setMusicPanel] = useState(false);
  const [playlistList, setPlaylistList] = useState([]);
  const location = useLocation();

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const togglePlay = () => setPlaying((prev) => !prev);
  const toggleMusicPanel = () => setMusicPanel((prev) => !prev);

  useEffect(() => {
    axios
      .get("http://localhost:7090/api/user/my/playlist", {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((response) => setPlaylistList(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    setMusicPanel(false);
  }, [location.pathname]);

  useEffect(() => setMute(volume === 0), [volume]);

  return (
    <>
      {musicPanel && (
        <div className="w-dvw fixed top-0 h-dvh z-20 bg-white flex justify-center flex-col items-center">
          {playlistList.length ? (
            "dsds"
          ) : (
            <Link to="/my">
              <div className="text-2xl font-bold">
                아직 설정된 플레이리스트가 없습니다.
              </div>
              <div>설정하러 가기</div>
            </Link>
          )}
        </div>
      )}
      <div className="fixed z-50 bottom-0 w-dvw">
        <div className="absolute hidden">
          <ReactPlayer
            url="https://wandukong.s3.ap-northeast-2.amazonaws.com/test.mp3"
            ref={playerRef}
            width="400px"
            height="50px"
            playing={playing}
            loop
            muted={mute}
            volume={volume}
            onPause={() => setPlaying(false)}
            onPlay={() => setPlaying(true)}
            onProgress={(progress) => setNowPlayTime(progress.playedSeconds)}
            onDuration={setDuration}
          />
        </div>
        <TimeLine
          playing={playing}
          setPlaying={setPlaying}
          playerRef={playerRef}
          setNowPlayTime={setNowPlayTime}
          nowPlayTime={nowPlayTime}
          duration={duration}
        />
        <div className="h-16 border px-8 flex content-center border-slate-100 z-auto backdrop-blur-3xl bg-white/90 gap-6">
          <button onClick={togglePlay}>
            <FontAwesomeIcon
              icon={playing ? "fa-solid fa-pause" : "fa-solid fa-play"}
            />
          </button>
          <button>
            <FontAwesomeIcon icon="fa-solid fa-forward-step" />
          </button>
          <Volume volume={volume} setVolume={setVolume} />
          <div className="font-bold content-center">
            {formatTime(nowPlayTime)} / {formatTime(duration)}
          </div>
          <button className="text-2xl" type="button" onClick={toggleMusicPanel}>
            <FontAwesomeIcon icon="fa-solid fa-caret-up" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ControllerUi;
