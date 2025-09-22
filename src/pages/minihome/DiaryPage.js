import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";

import axios from "axios";
import { formatDate } from "date-fns";

const DiaryPage = () => {
  const { userInfo } = useContext(LoginContext);
  const { userId } = useParams();
  const [diaryAllList, setDiaryAllList] = useState([]);
  const location = useLocation();

  console.log("userInfo:", userInfo);
  console.log("userId:", userId);

  useEffect(() => {
    if (location.pathname === `/${userId}/diary`) {
      axios
        .get("https://wookportfolio.duckdns.org:81/api/user/diary/list", {
          params: {
            userId: userId,
          },
          headers: { Authorization: localStorage.getItem("accessToken") }, // 헤더를 설정 객체 안에 포함
        })
        .then((response) => {
          console.log(response.data);
          const parser = new DOMParser();

          const decodeHtmlEntities = (str) => {
            const doc = parser.parseFromString(str, "text/html");
            return doc.documentElement.textContent;
          };

          setDiaryAllList(
            response.data.map((diary) => ({
              ...diary,
              content: diary.content
                ? decodeHtmlEntities(diary.content.replace(/<[^>]+>/g, ""))
                : null, // content가 null이 아닐 때만 replace() 호출
            }))
          );
        })
        .catch((error) => {
          console.error("Error fetching diaries:", error);
        });
    }
  }, [location.pathname, userId]);

  return (
    <>
      {userInfo ? (
        <>
          <div className="w-full h-auto mt-20 mb-16 flex relative p-4">
            {diaryAllList.length > 0 ? (
              <div className="flex flex-col gap-6">
                {diaryAllList.map((diary) => (
                  <NavLink
                    to={`${diary.postId}`}
                    key={diary.postId}
                    className="mb-4 flex flex-col gap-4"
                  >
                    <h3 className="font-bold text-2xl">{diary.title}</h3>
                    <p className="line-clamp-2 leading-4">{diary.content}</p>
                    <div className="text-sm text-gray-400 ">
                      {formatDate(diary.writeDay, "yyyy년 MM월 dd일")}
                    </div>
                  </NavLink>
                ))}
              </div>
            ) : (
              <>
                <div className="flex justify-center w-full flex-col h-full items-center">
                  <div className="font-bold text-2xl ">
                    아직 작성된 글이 없습니다.
                  </div>
                  <div>지금 바로 다이어리를 작성해보세요!</div>
                </div>
              </>
            )}
          </div>
          {userId == userInfo?.userId && (
            <div className="top-0 h-dvh sticky pt-20 pb-16">
              <Link
                to="write"
                className="h-14 w-14 m-4 content-center text-center bottom-16 right-0 bg-blue-600 py-1 rounded-full text-white text-xl absolute"
              >
                <FontAwesomeIcon icon="fa-solid fa-pen" />
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col justify-center w-full h-dvh pt-20 pb-16 relative p-4">
          <div className="text-center font-bold text-2xl tracking-tight">
            로그인이 필요합니다.
          </div>
        </div>
      )}
    </>
  );
};

export default DiaryPage;
