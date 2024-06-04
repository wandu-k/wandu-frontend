import axios from "axios";
import { useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PostWritePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { userId } = useParams();
  const navigate = useNavigate();

  const today = new Date();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title);
    console.log(content);

    axios
      .post(
        "http://localhost:7090/api/user/diary",
        {
          userId: userId,
          title: title,
          content: content,
        },
        {
          headers: { Authorization: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          navigate(`/${userId}/diary`);
        }
      })
      .catch((error) => {});
  };

  return (
    <div className="w-full h-auto mt-20 mb-16 relative p-4">
      <form
        className="flex flex-col h-full justify-between gap-4"
        onSubmit={handleSubmit}
      >
        <div className="text-2xl font-bold">
          {today.getFullYear()}년 {today.getMonth()}월 {today.getDate()}일
        </div>
        <div className="flex">
          <input
            className="w-full text-xl p-2 border-b"
            placeholder="제목을 입력해 주세요"
            name="title"
            id="title"
            required
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <ReactQuill
          className="flex flex-col h-full"
          onChange={(value) => setContent(value)}
        ></ReactQuill>
        <div className="flex gap-4 justify-end">
          <Link to={`/${userId}/diary`} className="border rounded-md p-1 px-4">
            취소
          </Link>
          <button
            type="submit"
            className="border border-blue-600 rounded-md p-1 px-4 bg-blue-500 text-white"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostWritePage;
