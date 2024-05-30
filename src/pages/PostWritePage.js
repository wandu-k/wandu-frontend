import axios from "axios";
import { useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";

const PostWritePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { userId } = useParams();

  const today = new Date();

  const cancelWrite = () => {
    console.log("취소");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title);
    console.log(content);

    axios
      .put(
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
      .then((response) => {})
      .catch((error) => {});
  };

  return (
    <div className="w-full h-full p-6">
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
          <button
            type="button"
            onClick={cancelWrite}
            className="border rounded-md p-1 px-4"
          >
            취소
          </button>
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
