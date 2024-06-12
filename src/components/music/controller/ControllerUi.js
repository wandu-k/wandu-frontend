import React, { useEffect, useState, useRef, useContext } from "react";
import ReactPlayer from "react-player/lazy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import Volume from "./Volume";
import TimeLine from "./TimeLine";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { MiniHomeContext } from "../../../contexts/MiniHomeContext";

const ControllerUi = () => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    const savedVolume = Cookies.get("volume");
    return savedVolume !== undefined && !isNaN(parseFloat(savedVolume))
      ? parseFloat(savedVolume)
      : 1;
  });
  const { miniHome } = useContext(MiniHomeContext);
  const [mute, setMute] = useState(volume === 0);
  const [nowPlayTime, setNowPlayTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);
  const [musicPanel, setMusicPanel] = useState(false);
  const location = useLocation();
  const [playlist, setPlaylist] = useState();
  const [bgmList, setBgmList] = useState([]);
  const [nowPlayNumber, setNowPlayNumber] = useState(0);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const togglePlay = () => setPlaying((prev) => !prev);
  const toggleMusicPanel = () => setMusicPanel((prev) => !prev);

  useEffect(() => setMute(volume === 0), [volume]);

  useEffect(() => {
    setMusicPanel(false);
  }, [location.pathname]);

  const loadBgmList = () => {
    axios
      .get(
        `http://localhost:7090/api/user/playlist/${miniHome?.playlistId}/bgm`,
        {
          headers: { Authorization: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        console.log(response.data);
        setBgmList(response.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (miniHome) {
      axios
        .get(
          `http://localhost:7090/api/user/playlist/${miniHome?.playlistId}`,
          {
            headers: { Authorization: localStorage.getItem("accessToken") },
          }
        )
        .then((response) => {
          console.log(response.data);
          setPlaylist(response.data);
          loadBgmList();
        })
        .catch((error) => {});
    }
  }, [miniHome]);

  const handleChangeMusic = (index) => {
    setNowPlayNumber(index);
    setPlaying(true);
  };

  const handleOnEndedPlayer = () => {
    if (bgmList.length > nowPlayNumber) {
      setNowPlayNumber(nowPlayNumber + 1);
      setPlaying(true);
    }
  };

  const handleOnProgress = (progress) => {
    setNowPlayTime(progress.playedSeconds);
  };

  return (
    <>
      <div
        className={
          "w-dvw fixed top-0 h-dvh z-20 bg-white dark:bg-zinc-900 pt-20 pb-16 flex justify-center flex-col items-center transition-transform duration-300 " +
          (!musicPanel && " translate-y-full")
        }
      >
        {miniHome?.playlistId ? (
          <>
            {bgmList.length > 0 ? (
              <>
                <div className=" container h-full items-center mx-auto flex p-4">
                  <div className=" w-full flex justify-center">
                    <div className="flex flex-col">
                      <div className="w-96 h-96 relative">
                        <img
                          className="absolute inset-0 object-cover w-full h-full"
                          src={
                            "data:image/jpeg;base64," +
                            (bgmList.length > 0 && bgmList[nowPlayNumber].album)
                          }
                        ></img>
                      </div>
                    </div>
                  </div>
                  <div className=" w-full flex flex-col">
                    {bgmList.map((bgm, index) => (
                      <button
                        key={bgm.itemId}
                        className={
                          "flex h-14 items-center p-2 " +
                          (index == nowPlayNumber &&
                            "dark:bg-zinc-600 bg-gray-200")
                        }
                        onClick={() => handleChangeMusic(index)}
                      >
                        <div className="flex w-full items-center gap-4">
                          <div className="w-11 aspect-square relative">
                            <img
                              className="absolute inset-0 object-cover w-full h-full"
                              src={
                                "data:image/jpeg;base64," +
                                (bgmList.length > 0 && bgmList[index].album)
                              }
                            ></img>
                          </div>
                          <div>
                            <div className="">{bgm.title}</div>
                            <h3 className=" text-gray-300">
                              {bgm?.artist || "정보 없음"}
                            </h3>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {" "}
                <Link
                  to="/my/inventory?categoryName=음악"
                  onClick={() => setMusicPanel(false)}
                >
                  <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold">
                      현재 플레이리스트에 노래가 없습니다.
                    </div>
                    <div>추가하러 가기</div>
                  </div>
                </Link>
              </>
            )}
          </>
        ) : (
          <Link to="/my" onClick={() => setMusicPanel(false)}>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold">
                아직 설정된 플레이리스트가 없습니다.
              </div>
              <div>설정하러 가기</div>
            </div>
          </Link>
        )}
      </div>

      <div className="fixed z-50 bottom-0 w-dvw">
        <div className="absolute hidden">
          <ReactPlayer
            url={bgmList[nowPlayNumber]?.url}
            ref={playerRef}
            width="400px"
            height="50px"
            playing={playing}
            muted={mute}
            volume={volume}
            onPause={() => setPlaying(false)}
            onPlay={() => setPlaying(true)}
            onEnded={handleOnEndedPlayer}
            onProgress={(progress) => handleOnProgress(progress)}
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
        <div
          className="h-16  px-8 flex justify-between content-center dark:bg-zinc-900/80 z-auto backdrop-blur-3xl bg-white/80 gap-6 relative"
          onClick={toggleMusicPanel}
        >
          <div className="flex flex-col w-ful items-center justify-center absolute inset-0 m-auto">
            {bgmList.length > 0 ? (
              <>dsd</>
            ) : (
              <>
                <div>현재 곡이 존재하지 않아요</div>
              </>
            )}
          </div>
          <div className="flex gap-6">
            <div className="flex gap-6" onClick={(e) => e.stopPropagation()}>
              <button>
                <FontAwesomeIcon icon="fa-solid fa-backward-step" />
              </button>
              <button onClick={togglePlay}>
                <FontAwesomeIcon
                  icon={playing ? "fa-solid fa-pause" : "fa-solid fa-play"}
                />
              </button>
              <button>
                <FontAwesomeIcon icon="fa-solid fa-forward-step" />
              </button>
            </div>
            <div className="flex gap-4" onClick={(e) => e.stopPropagation()}>
              <Volume volume={volume} setVolume={setVolume} />
              <div className="font-bold content-center">
                {formatTime(nowPlayTime)} / {formatTime(duration)}
              </div>
            </div>
          </div>

          <button
            className="text-2xl"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleMusicPanel();
            }}
          >
            <FontAwesomeIcon
              icon="fa-solid fa-caret-up"
              className={
                "transition-transform duration-300" +
                (musicPanel && " rotate-180")
              }
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default ControllerUi;
