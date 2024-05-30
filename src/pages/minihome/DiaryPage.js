import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoginContext } from "../../contexts/LoginContext";

const DiaryPage = () => {
  const { userInfo } = useContext(LoginContext);
  const { userId } = useParams();

  console.log("userInfo:", userInfo);
  console.log("userId:", userId);

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div className="font-bold text-2xl">아직 작성된 글이 없습니다.</div>
      {userInfo ? (
        userInfo.userId == userId ? (
          <>
            <div>지금 바로 다이어리를 작성해보세요!</div>
            <br />
            <Link
              to={"write"}
              className="flex gap-2 items-center bg-slate-100 py-1 px-2 rounded-md"
            >
              <FontAwesomeIcon icon="fa-solid fa-pen" />
              <div className="font-bold">글쓰기</div>
            </Link>
          </>
        ) : (
          <div className="text-center">다른 사용자의 다이어리입니다.</div>
        )
      ) : (
        <div className="text-center">로그인이 필요합니다.</div>
      )}
    </div>
  );
};

export default DiaryPage;
