import { Link, useOutletContext } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { LoginContext } from "../../contexts/LoginContext";
import { MiniHomeContext } from "../../contexts/MiniHomeContext";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MyInfoPage = () => {
  const userInfo = useOutletContext();
  const { loginCheck } = useContext(LoginContext);
  const { miniHome, fetchMiniHomeData } = useContext(MiniHomeContext);
  const [enableEditP, setEnableEditP] = useState(false);
  const [enableEditM, setEnableEditM] = useState(false);
  const { register, handleSubmit, error, reset } = useForm();
  const [nickname, setNickname] = useState();
  const [intro, setIntro] = useState();
  const [statistics, setStatistics] = useState();
  const [playlistList, setPlaylistList] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState();
  const [introduction, setIntroduction] = useState();
  const [statusM, setStatusM] = useState();

  useEffect(() => {
    fetchMiniHomeData();
    axios
      .get("http://localhost:7090/api/my/statistics", {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setStatistics(response.data);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    setNickname(userInfo?.nickname);
    setIntro(userInfo?.intro);
  }, [userInfo]);

  useEffect(() => {
    setIntroduction(miniHome?.introduction);
    setStatusM(miniHome?.statusM);
  }, [miniHome]);

  const handleEditMiniHome = () => {
    axios
      .patch(
        `http://localhost:7090/api/user/minihome`,
        {
          introduction: introduction,
          statusM: statusM,
        },
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        Notify.success(response.data);
        fetchMiniHomeData();
      })
      .catch((error) => {});
    setEnableEditM(false);
  };

  const handleEditProfile = () => {
    const formData = new FormData();
    const data = { nickname, intro };
    const jsonData = JSON.stringify(data);

    const blob = new Blob([jsonData], { type: "application/json" });
    formData.append("profileImage", null);
    formData.append("userDto", blob);
    console.log(userInfo?.userId);
    axios
      .put(`http://localhost:7090/api/user`, formData, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        loginCheck();
        Notify.success(response.data);
      })
      .catch((error) => {});
    setEnableEditP(false);
  };

  useEffect(() => {
    loadPlayList();
  }, []);

  const loadPlayList = () => {
    axios
      .get("http://localhost:7090/api/my/playlist", {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((response) => setPlaylistList(response.data))
      .catch((error) => console.error(error));
  };

  const handleSelectPlaylist = (playlist) => {
    console.log(playlist);
    setSelectedPlaylist(playlist);
    console.log(selectedPlaylist);
  };

  useEffect(() => {
    reset();
  }, [selectedPlaylist]);

  const addNewPlayList = (data) => {
    console.log(data);

    const { plName } = data;

    axios
      .post(
        "http://localhost:7090/api/my/playlist",
        {
          plName: plName,
        },
        {
          headers: { Authorization: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        Notify.success(response.data);
        loadPlayList();
      })
      .catch((error) => {});
  };

  const handlePlaylistDelete = (playlistId) => {
    axios
      .delete(`http://localhost:7090/api/my/playlist/${playlistId}`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        Notify.success(response.data);
        loadPlayList();
      })
      .catch((error) => {
        Confirm.show(
          "삭제 경고",
          "해당 플레이리스트는 미니홈과 연결되어있습니다. 정말 삭제할까요?",
          "삭제",
          "취소",
          () => {
            handleSetPlaylist();
            handlePlaylistDelete(playlistId);
          },
          () => {},
          {}
        );
      });
    setSelectedPlaylist(null);
  };

  const editPlayList = (data) => {
    console.log(data);
    const { plName } = data;
    axios
      .put(
        `http://localhost:7090/api/my/playlist/${selectedPlaylist.playlistId}`,
        {
          plName: plName,
        },
        {
          headers: { Authorization: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        loadPlayList();
        Notify.success(response.data);
      })
      .catch((error) => {});
    setSelectedPlaylist(null);
  };

  const handleSetPlaylist = (playlistId) => {
    axios
      .patch(
        `http://localhost:7090/api/user/minihome/playlist`,
        playlistId,

        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        Notify.success(response.data);
        fetchMiniHomeData();
      })
      .catch((error) => {});
    setSelectedPlaylist(null);
  };

  return (
    <>
      <div className="w-full mt-20 mb-16 p-4 flex flex-col gap-12 tracking-tight">
        <div className="flex w-full gap-4 max-lg:flex-col">
          <div className="max-lg:w-full w-3/4 h-full font-bold flex flex-col gap-2">
            <div className=" text-xl border-l pl-4">판매 정보</div>
            <div className="grid  md:grid-cols-3 gap-4 md:divide-x max-md:divide-y">
              <div className=" flex flex-col justify-center items-center gap-4 min-h-32   p-6">
                <div className=" text-6xl">
                  {statistics?.uploadCount || "0"}
                </div>
                <div>업로드</div>
              </div>
              <div className=" flex flex-col justify-center items-center gap-4 min-h-32  p-6">
                <div className="text-6xl">{statistics?.sellCount || "0"}</div>
                <div>판매 수</div>
              </div>
              <div className=" flex flex-col justify-center items-center gap-4 min-h-32 p-6">
                <div className="text-6xl">0</div>
                <div>받은 좋아요</div>
              </div>
            </div>
          </div>
          <div className="max-lg:w-full w-1/4 h-full font-bold flex flex-col gap-2">
            <div className=" text-xl border-l pl-4">구매 정보</div>
            <div className="grid grid-cols-1 h-full gap-4">
              <Link
                to={"/my/inventory"}
                className="flex flex-col justify-center items-center gap-4 w-full min-h-32 p-6"
              >
                <div className=" text-6xl">{statistics?.buyCount || "0"}</div>
                <div>구매</div>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className=" text-xl border-l pl-4 font-bold">프로필 설정</div>
          <div className="flex gap-4">
            <form
              className="flex flex-col w-full gap-4"
              onSubmit={(e) => {
                e.preventDefault(); // 폼 제출 방지
                handleEditProfile(); // 폼 처리 함수 호출
              }}
            >
              <div className="w-full flex justify-between h-11 items-center">
                <label className="w-1/3 font-bold">닉네임</label>
                <div className="flex w-2/3 h-full gap-4">
                  <input
                    type="text"
                    className="border rounded-2xl w-full px-4 h-full dark:bg-zinc-950 dark:border-zinc-800"
                    disabled={!enableEditP}
                    defaultValue={userInfo?.nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full flex justify-between h-full">
                <label className="w-1/3 font-bold">자기소개</label>
                <div className="flex w-2/3 h-full gap-4">
                  <textarea
                    type="text"
                    disabled={!enableEditP}
                    className="border rounded-2xl w-full p-4 h-full resize-none dark:bg-zinc-950 dark:border-zinc-800"
                    defaultValue={userInfo?.intro}
                    onChange={(e) => setIntro(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4">
                {enableEditP && (
                  <button
                    type="button"
                    className="w-20 h-11 rounded-2xl font-bold text-black border"
                    onClick={() => setEnableEditP(false)}
                  >
                    취소
                  </button>
                )}
                {!enableEditP && (
                  <button
                    type="button"
                    className="bg-lime-500 w-20 h-11 rounded-2xl font-bold text-white"
                    onClick={() => setEnableEditP(true)}
                  >
                    수정
                  </button>
                )}
                {enableEditP && (
                  <button
                    type="submit"
                    className="bg-lime-500 w-20 h-11 rounded-2xl font-bold text-white"
                  >
                    저장
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className=" text-xl border-l pl-4 font-bold">미니홈 설정</div>
          <div className="flex gap-4">
            <form
              className="flex flex-col w-full gap-4"
              onSubmit={(e) => {
                e.preventDefault(); // 폼 제출 방지
                handleEditMiniHome(); // 폼 처리 함수 호출
              }}
            >
              <div className="w-full flex justify-between h-11 items-center">
                <label className="w-1/3 font-bold">상태</label>
                <div className="flex w-2/3 h-full gap-4">
                  <input
                    type="text"
                    className="border rounded-2xl w-full px-4 h-full dark:bg-zinc-950 dark:border-zinc-800"
                    disabled={!enableEditM}
                    onChange={(e) => setStatusM(e.target.value)}
                    defaultValue={miniHome?.statusM}
                  />
                </div>
              </div>
              <div className="w-full flex justify-between h-full">
                <label className="w-1/3 font-bold">소개글</label>
                <div className="flex w-2/3 h-full gap-4">
                  {" "}
                  <textarea
                    type="text"
                    disabled={!enableEditM}
                    className="border rounded-2xl w-full p-4 h-full resize-none dark:bg-zinc-950 dark:border-zinc-800"
                    onChange={(e) => setIntroduction(e.target.value)}
                    defaultValue={miniHome?.introduction}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4">
                {enableEditM && (
                  <button
                    type="button"
                    className="w-20 h-11 rounded-2xl font-bold text-black border"
                    onClick={() => setEnableEditM(false)}
                  >
                    취소
                  </button>
                )}
                {!enableEditM && (
                  <button
                    type="button"
                    className="bg-lime-500 w-20 h-11 rounded-2xl font-bold text-white"
                    onClick={() => setEnableEditM(true)}
                  >
                    수정
                  </button>
                )}
                {enableEditM && (
                  <button
                    type="submit"
                    className="bg-lime-500 w-20 h-11 rounded-2xl font-bold text-white"
                  >
                    저장
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="text-xl border-l pl-4 font-bold">
            플레이리스트 설정
          </div>
          <div className="flex h-96 gap-4">
            <div className="flex flex-col w-1/2 gap-4">
              <label className="font-bold">플레이리스트 목록</label>
              <div className="h-full border rounded-2xl dark:bg-zinc-950 dark:border-zinc-800">
                {playlistList.length ? (
                  <div className="grid  divide-y grid-cols-1">
                    {playlistList.map((playlist) => (
                      <button
                        type="button"
                        key={playlist.playlistId}
                        className=" h-14"
                        onClick={() => handleSelectPlaylist(playlist)}
                      >
                        <h3 className="font-bold ">{playlist.plName}</h3>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="grid h-full divide-y grid-cols-1">
                    <div className="h-full  font-bold text-center content-center">
                      플레이리스트가 없음
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4 w-1/2">
              {selectedPlaylist ? (
                <>
                  <form
                    onSubmit={handleSubmit(editPlayList)}
                    className="flex  flex-col gap-4"
                  >
                    <>
                      <label className="font-bold">
                        플레이리스트 수정 : {selectedPlaylist?.plName}
                      </label>
                      <input
                        placeholder="제목"
                        type="text"
                        className="border rounded-2xl w-full px-4 h-11 dark:bg-zinc-950 dark:border-zinc-800"
                        defaultValue={selectedPlaylist?.plName}
                        {...register("plName", { required: true })}
                      ></input>
                      <div className="flex w-full justify-end gap-4">
                        <button
                          type="submit"
                          className="bg-lime-500 w-full h-11 rounded-2xl font-bold text-white"
                        >
                          수정
                        </button>
                        <button
                          onClick={() =>
                            handlePlaylistDelete(selectedPlaylist.playlistId)
                          }
                          type="button"
                          className="bg-red-500 w-full h-11 rounded-2xl font-bold text-white"
                        >
                          삭제
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedPlaylist(null)}
                          className=" w-full h-11 rounded-2xl border font-bold "
                        >
                          취소
                        </button>
                        <button
                          type="button"
                          className="bg-blue-600 w-full h-11 rounded-2xl font-bold text-white"
                          onClick={() =>
                            handleSetPlaylist(selectedPlaylist.playlistId)
                          }
                        >
                          미니홈 설정
                        </button>
                      </div>
                    </>
                  </form>
                </>
              ) : (
                <>
                  <form
                    onSubmit={handleSubmit(addNewPlayList)}
                    className="flex flex-col gap-4"
                  >
                    <>
                      <label className="font-bold">새 플레이리스트</label>
                      <input
                        placeholder="제목"
                        type="text"
                        className="border rounded-2xl w-full px-4 h-11 dark:bg-zinc-950 dark:border-zinc-800"
                        defaultValue={""}
                        {...register("plName", { required: true })}
                      ></input>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="bg-lime-500 w-20 h-11 rounded-2xl font-bold text-white"
                        >
                          추가
                        </button>
                      </div>
                    </>
                  </form>
                </>
              )}
              <div className=" flex h-full justify-center gap-4 font-bold items-center">
                <label>미니홈에 설정된 플레이리스트 :</label>
                <div>
                  {playlistList.map((playlist) => (
                    <>
                      {miniHome?.playlistId == playlist?.playlistId && (
                        <button
                          type="button"
                          key={playlist.playlistId}
                          className=" h-14"
                          onClick={() => handleSelectPlaylist(playlist)}
                        >
                          <h3 className="font-bold ">{playlist.plName}</h3>
                        </button>
                      )}
                    </>
                  ))}
                </div>
                <button className=" text-red-600">비활성화</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyInfoPage;
