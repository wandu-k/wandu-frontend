import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import DOMPurify from "dompurify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";
const PostPage = () => {
  const { postId } = useParams();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null); // 게시물 상태
  useEffect(() => {
    axios
      .get(`/api/user/${userId}/diary/${postId}`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log(response.data);
        setPost(response.data); // 받은 데이터를 상태에 저장
      })

      .then((error) => {});
  }, [postId]);

  const handlePostDelete = () => {
    Confirm.show(
      "다이어리 삭제 확인",
      "정말로 삭제하나요?",
      "삭제",
      "취소",
      () => {
        axios
          .delete(`/api/user/diary/${postId}`, {
            headers: { Authorization: localStorage.getItem("accessToken") },
          })
          .then((response) => {
            console.log(response.data);
            navigate(`/${userId}/diary`);
            Notify.success(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      () => {},
      {},
    );
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {" "}
      <div className="w-full flex h-auto mt-20 mb-16 relative p-4 w-full">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{post.title}</h1> {/* 제목 표시 */}
          <div>{post.writeDay}</div>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content),
            }}
          ></div>
        </div>
      </div>
      <div className="top-0 h-dvh sticky pt-20 pb-16">
        <button
          onClick={handlePostDelete}
          type="button"
          className="h-14 w-14 m-4 content-center text-center bottom-16 right-0 bg-red-600 py-1 rounded-full text-white text-xl absolute"
        >
          <FontAwesomeIcon icon="fa-solid fa-trash" />
        </button>
      </div>
    </>
  );
};

export default PostPage;
