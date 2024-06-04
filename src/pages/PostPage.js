import axios from "axios";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null); // 게시물 상태
  useEffect(() => {
    axios
      .get(`http://localhost:7090/api/user/diary/${postId}`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log(response.data);
        setPost(response.data); // 받은 데이터를 상태에 저장
      })

      .then((error) => {});
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {" "}
      <div className="w-full h-auto mt-20 mb-16 relative p-4">
        <h1 className="text-3xl font-bold">{post.title}</h1> {/* 제목 표시 */}
        <ReactQuill
          readOnly={true}
          value={post.content}
          theme={"bubble"}
        ></ReactQuill>
      </div>
    </>
  );
};

export default PostPage;
