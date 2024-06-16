import { useContext, useEffect, useState } from "react";
import MyRoomUi from "../components/miniHome/myRoom/MyRoomUi";
import { useParams } from "react-router-dom";
import { MiniHomeContext } from "../contexts/MiniHomeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

const MainPage = () => {
  const { userId } = useParams();
  const { miniHome } = useContext(MiniHomeContext);

  useEffect(() => {
    if (miniHome) {
      axios
        .post(
          `/api/user/minihome/${miniHome.hpId}/guest`,
          {},
          {
            headers: { Authorization: localStorage.getItem("accessToken") },
          },
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {});
    }
  }, [miniHome]);

  return (
    <>
      {" "}
      <div className="w-full pt-24 pb-20 px-4 rounded-2xl overflow-hidden flex flex-col gap-4">
        <div className={"w-full aspect-video"}>
          <MyRoomUi userId={userId} miniHome={miniHome} />
        </div>
        <div className={"flex justify-between"}>
          <h1 className={"text-xl font-bold"}>{miniHome?.statusM}</h1>
          <div className={"content-center flex w-full justify-end"}>
            <button
              type={"button"}
              className={
                "rounded-full bg-gray-100 text-xl flex items-center justify-center h-full gap-4 px-2"
              }
            >
              <div className={"text-sm"}>100</div>
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>
        </div>
        <div className={"bg-gray-100 rounded-2xl p-4"}>
          {miniHome?.introduction}
        </div>
        <div className={"font-bold text-xl"}>방명록</div>
        <div>
          <form className={"flex flex-col w-full gap-4"}>
            <input
              type={"text"}
              className={"border-b"}
              placeholder={"댓글 추가..."}
            />
            <div className={"flex justify-end gap-4"}>
              <button
                type={"button"}
                className={"h-11 w-20 rounded-2xl border font-bold"}
              >
                취소
              </button>
              <button
                type={"submit"}
                className={
                  "h-11 w-20 rounded-2xl bg-lime-500 text-white font-bold"
                }
              >
                확인
              </button>
            </div>
          </form>
        </div>
        <div className={"flex flex-col"}></div>
      </div>
    </>
  );
};

export default MainPage;
