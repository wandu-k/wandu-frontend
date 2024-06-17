import React, { useContext, useEffect, useRef, useState } from "react";
import MyRoomUi from "../components/miniHome/myRoom/MyRoomUi";
import { Link, useParams } from "react-router-dom";
import { MiniHomeContext } from "../contexts/MiniHomeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useForm } from "react-hook-form";
import { LoginContext } from "../contexts/LoginContext";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import defaultProfileImage from "../images/basic/profile.png";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";

const MainPage = () => {
  const { userId } = useParams();
  const { miniHome, setMiniHome } = useContext(MiniHomeContext);
  const { userInfo } = useContext(LoginContext);
  const [commentEnable, setCommentEnable] = useState(false);
  const [comments, setComments] = useState([]);
  const [editMenus, setEditMenus] = useState({});
  const editMenu = useRef(null);
  const editMenuButton = useRef(null);
  const { register, handleSubmit, error, reset } = useForm();
  const commentCancel = () => {
    reset();
    setCommentEnable(false);
  };

  useEffect(() => {
    // 특정 영역 외 클릭 시 발생하는 이벤트
    const handleFocus = (e) => {
      if (
        editMenu.current &&
        !editMenu.current.contains(e.target) &&
        editMenuButton.current &&
        !editMenuButton.current.contains(e.target)
      ) {
        setEditMenus(false);
      }
    };

    // 이벤트 리스너에 handleFocus 함수 등록
    document.addEventListener("mouseup", handleFocus);
    return () => {
      document.removeEventListener("mouseup", handleFocus);
    };
  }, []);

  const addComment = (data) => {
    console.log(data);
    axios
      .post(
        `/api/user/minihome/${miniHome.hpId}/guest`,
        {
          userId: userInfo.userId,
          mainContent: data.mainContent,
        },
        {
          headers: { Authorization: localStorage.getItem("accessToken") },
        },
      )
      .then((response) => {
        console.log(response.data);
        Notify.success(response.data);
        const comment = {
          commentId: comments[0].commentId + 1,
          mainContent: data.mainContent,
          nickname: userInfo.nickname,
          profileImage: userInfo.profileImage,
        };
        console.log(comments);
        setComments((prevMessages) => [comment, ...prevMessages]);
      })
      .catch((error) => {});
    reset();
    setCommentEnable(false);
  };

  const deleteButton = (commentId) => {
    Confirm.show(
      "방명록 삭제",
      "방명록을 완전히 삭제 할까요?",
      "삭제",
      "취소",
      () => {
        axios
          .delete(`/api/user/minihome/${miniHome.hpId}/guest/${commentId}`, {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
          })
          .then((response) => {
            console.log(response.data);
            Notify.success(response.data);
            setComments((prevComments) =>
              prevComments.filter((comment) => comment.commentId !== commentId),
            );
          })
          .catch((error) => {});
      },
      () => {},
      {},
    );
  };

  const miniHomeLike = () => {
    if (miniHome?.like == true) {
      axios
        .delete(`/api/user/minihome/${miniHome.hpId}/like/${userInfo.userId}`, {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          console.log(response.data);
          setMiniHome((prevMiniHome) => ({
            ...prevMiniHome,
            like: false,
            likeCount: prevMiniHome.likeCount - 1,
          }));
        })
        .catch((error) => {});
    } else {
      axios
        .post(
          `/api/user/minihome/${miniHome.hpId}/like/${userInfo.userId}`,
          {},
          {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
          },
        )
        .then((response) => {
          console.log(response.data);
          setMiniHome((prevMiniHome) => ({
            ...prevMiniHome,
            like: true,
            likeCount: prevMiniHome.likeCount + 1,
          }));
        })
        .catch((error) => {});
    }
  };

  useEffect(() => {
    if (miniHome) {
      axios
        .post(
          `/api/user/minihome/${miniHome.hpId}/guest/list`,
          {},
          {
            headers: { Authorization: localStorage.getItem("accessToken") },
          },
        )
        .then((response) => {
          setComments(response.data.dtoList);
          console.log(response.data);
        })
        .catch((error) => {});
    }
  }, [miniHome]);

  const toggleEditMenu = (commentId) => {
    setEditMenus((prevMenus) => ({
      ...prevMenus,
      [commentId]: !prevMenus[commentId],
    }));
  };

  return (
    <>
      {" "}
      <div className="w-full pt-24 pb-20 px-4 rounded-2xl overflow-hidden flex flex-col gap-4">
        <div className={"w-full aspect-video"}>
          <MyRoomUi userId={userId} miniHome={miniHome} />
        </div>
        <div className={"flex justify-between h-8"}>
          <h1 className={"text-xl font-bold content-center"}>
            {miniHome?.statusM}
          </h1>
          <div className={"content-center flex w-full justify-end"}>
            <button
              type={"button"}
              onClick={miniHomeLike}
              className={
                "rounded-full bg-gray-100 text-xl flex items-center justify-center h-full gap-4 px-2"
              }
            >
              <div className={"text-sm"}>{miniHome?.likeCount}</div>
              {miniHome?.like ? (
                <FontAwesomeIcon icon="fa-solid fa-heart" />
              ) : (
                <FontAwesomeIcon icon={faHeart} />
              )}
            </button>
          </div>
        </div>
        <div className={"bg-gray-100 rounded-2xl p-4"}>
          {miniHome?.introduction}
        </div>
        <div className={"font-bold text-xl"}>방명록</div>
        <div>
          <form
            className={"flex flex-col w-full gap-4"}
            onSubmit={handleSubmit(addComment)}
          >
            <input
              type={"text"}
              className={"border-b"}
              placeholder={"댓글 추가..."}
              onFocus={() => setCommentEnable(true)}
              {...register("mainContent", { required: true })}
            />
            {commentEnable && (
              <>
                <div className={"flex justify-end gap-4"}>
                  <button
                    type={"button"}
                    onClick={commentCancel}
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
              </>
            )}
          </form>
        </div>
        <div className="flex flex-col gap-4">
          {comments.length > 0 && (
            <>
              {" "}
              {comments.map((comment) => (
                <div key={comment?.commentId} className={"flex gap-4 relative"}>
                  <div
                    className={
                      "h-11 w-11 overflow-hidden rounded-full relative"
                    }
                  >
                    <img
                      className={"absolute w-full h-full inset-0"}
                      src={
                        comment.profileImage
                          ? comment.profileImage
                          : defaultProfileImage
                      }
                    />
                  </div>
                  <div className={"flex flex-col w-full"}>
                    <div className={"font-bold w-auto "}>
                      <Link to={`/${comment?.userId}/minihome`}>
                        {" "}
                        {comment?.nickname}
                      </Link>
                    </div>
                    <div>{comment?.mainContent}</div>
                    <div className={"text-sm text-gray-400"}>
                      {comment?.writeDate}
                    </div>
                  </div>
                  {comment?.userId == userInfo?.userId && (
                    <>
                      <div className={""}>
                        <button
                          type={"button"}
                          onClick={() => toggleEditMenu(comment?.commentId)}
                        >
                          <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" />
                        </button>
                      </div>
                    </>
                  )}

                  {editMenus[comment?.commentId] && (
                    <>
                      <div
                        ref={editMenu}
                        className={
                          "absolute bottom-0 right-0 bg-white rounded-2xl border p-4"
                        }
                      >
                        <button
                          ref={editMenuButton}
                          type={"button"}
                          onClick={() => deleteButton(comment?.commentId)}
                          className={"flex gap-4 items-center"}
                        >
                          <FontAwesomeIcon icon="fa-solid fa-trash" />
                          삭제
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MainPage;
