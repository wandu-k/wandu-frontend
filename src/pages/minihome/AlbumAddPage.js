import { useContext, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoginContext } from "../../contexts/LoginContext";

import axios from "axios";
import { format, formatDate } from "date-fns";
import { useForm } from "react-hook-form";

const AlbumAddPage = () => {
  const { register, handleSubmit, error, reset } = useForm();
  const fileInputRef = useRef();
  const [imgPath, setImgPath] = useState("");
  const navigate = useNavigate();
  const { userId } = useParams();

  const AddAlbum = (data) => {
    const formDataToSend = new FormData();

    // 이미지 파일을 fileInputRef에서 가져와 FormData에 추가
    if (fileInputRef.current && fileInputRef.current.files) {
      const imageFile = fileInputRef.current.files[0];
      formDataToSend.append("multipartFile", imageFile); // 파일 이름 추가
    }

    // 서버 데이터 추가
    const jsonData = JSON.stringify(data);

    const blob = new Blob([jsonData], { type: "application/json" });
    formDataToSend.append("albumDto", blob);

    console.log(data);
    axios
      .post("http://localhost:7090/api/user/album", formDataToSend, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          "Content-Type": "multipart/form-data",
        }, // 헤더를 설정 객체 안에 포함
      })
      .then((response) => {
        console.log(response.data);

        navigate(`/${userId}/album`);
      })
      .catch((error) => {});
  };

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 파일 입력(input) 요소를 클릭하여 파일 선택 다이얼로그를 엽니다.
    }
  };

  const previewImage = () => {
    if (fileInputRef.current && fileInputRef.current.files) {
      const img = fileInputRef.current.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => {
        setImgPath(reader.result);
      };
    }
  };

  return (
    <>
      <div className="w-full h-auto mt-20 mb-16 flex relative p-4 justify-center">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(AddAlbum)}>
          <button
            type="button"
            className="border rounded-2xl overflow-hidden"
            onClick={handleFileButtonClick}
          >
            <div className="w-96 h-96 relative">
              <img
                src={imgPath}
                className=" absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={previewImage}
          ></input>
          <textarea
            className="border rounded-2xl overflow-hidden p-2 resize-none"
            type="text"
            placeholder="설명을 적어주세요."
            {...register("intro", { required: true })}
          ></textarea>

          <button
            type="submit"
            className="bg-lime-500 text-white font-bold rounded-2xl h-11"
          >
            업로드
          </button>
        </form>
      </div>
    </>
  );
};

export default AlbumAddPage;
