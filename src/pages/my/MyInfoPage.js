import { Link, useOutletContext } from "react-router-dom";
import AvatarUi from "../../components/avatar/AvatarUi";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { LoginContext } from "../../contexts/LoginContext";

const MyInfoPage = () => {
  const userInfo = useOutletContext();
  const { loginCheck } = useContext(LoginContext);
  const [enableEditP, setEnableEditP] = useState();
  const { register, handleSubmit, error } = useForm();
  const [statistics, setStatistics] = useState();

  useEffect(() => {
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

  const handleEditProfile = (data) => {
    if (enableEditP != true) {
      setEnableEditP(true);
    } else {
      const formData = new FormData();

      const jsonData = JSON.stringify(data);

      const blob = new Blob([jsonData], { type: "application/json" });
      formData.append("profileImage", null);
      formData.append("userDto", blob);
      console.log(userInfo?.userId);
      axios
        .put(`http://localhost:7090/api/user/${userInfo?.userId}`, formData, {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          setEnableEditP(false);
          loginCheck();
        })
        .catch((error) => {});
    }
  };

  return (
    <>
      <div className="w-full mt-20 p-4 flex flex-col gap-12 tracking-tight">
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
            <div className="flex flex-col w-full gap-4">
              <div className="w-full flex justify-between h-11 items-center">
                <label className="w-1/3 font-bold">닉네임</label>
                <div className="flex w-2/3 h-full gap-4">
                  <input
                    type="text"
                    className="border rounded-2xl w-full px-4 h-full"
                    disabled={!enableEditP}
                    defaultValue={userInfo?.nickname}
                    {...register("nickname", { required: true })}
                  />
                </div>
              </div>
              <div className="w-full flex justify-between h-full">
                <label className="w-1/3 font-bold">자기소개</label>
                <div className="flex w-2/3 h-full gap-4">
                  {" "}
                  <textarea
                    type="text"
                    disabled={!enableEditP}
                    className="border rounded-2xl w-full p-4 h-full resize-none"
                    defaultValue={userInfo?.intro}
                    {...register("intro", { required: false })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4">
                {enableEditP && (
                  <button
                    className="w-20 h-11 rounded-2xl font-bold text-black border"
                    onClick={handleSubmit(handleEditProfile)}
                  >
                    취소
                  </button>
                )}
                <button
                  className="bg-lime-500 w-20 h-11 rounded-2xl font-bold text-white"
                  onClick={
                    enableEditP
                      ? handleSubmit(handleEditProfile)
                      : handleEditProfile
                  }
                >
                  {enableEditP ? "저장" : "수정"}
                </button>
              </div>
            </div>
            <div className=" h-72 min-w-56 border rounded-2xl">
              <AvatarUi></AvatarUi>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyInfoPage;
