import axios from "axios";
import { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

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
        <div>
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
        </div>

        <Editor
          onChange={(value) => setContent(value)}
          apiKey="mqvcirn1n2i01h0ifbltkq2fk0cvwadntra96la2j2p1g379"
          init={{
            height: "100%",
            plugins:
              "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
            tinycomments_mode: "embedded",
            tinycomments_author: "Author name",
            mergetags_list: [
              { value: "First.Name", title: "First Name" },
              { value: "Email", title: "Email" },
            ],
            ai_request: (request, respondWith) =>
              respondWith.string(() =>
                Promise.reject("See docs to implement AI Assistant")
              ),
          }}
        ></Editor>
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
