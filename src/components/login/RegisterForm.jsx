import { useForm } from "react-hook-form";
import naver from "../../images/login/naver.png";
import google from "../../images/login/google.png";
import api from "../../apis/Api";
import {useContext, useState} from "react";
import { LoginContext } from "../../contexts/LoginContext";

const RegisterForm = () => {
  const { register, handleSubmit, error } = useForm();
  const [ errorMessage, setErrorMessage ] = useState(null);

  const { login } = useContext(LoginContext);

  const onSubmit = (data) => {

    console.log(data);
    if(data.password != data.passwordCheck)
    {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    const formData = new FormData();

    const jsonData = JSON.stringify(data);

    const blob = new Blob([jsonData], { type: "application/json" });
    formData.append("profileImage", null);
    formData.append("accountDto", blob);

    api
      .post("/api/public/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          login(data.username, data.password);
        }
      })
      .catch((error) => {});
  };
  return (
    <>
      <form
        className="flex flex-col justify-between gap-12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="password">닉네임</label>
            <input
                type="text"
                id="nickname"
                name="nickname"
                onFocus={()=>setErrorMessage(null)}
                className="bg-white border rounded-xl h-10 px-4"
                {...register("nickname", {required: true})}
            ></input>
          </div>
          <div className="flex flex-col">
            <label htmlFor="username">이메일</label>
            <input
                type="email"
                id="username"
                name="username"
                onFocus={()=>setErrorMessage(null)}
                {...register("username", {required: true})}
                className="bg-white border rounded-xl h-10 px-4"
            ></input>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">비밀번호</label>
            <input
                type="password"
                id="password"
                name="password"
                onFocus={()=>setErrorMessage(null)}
                className="bg-white border rounded-xl h-10 px-4"
                {...register("password", {required: true})}
            ></input>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">비밀번호 확인</label>
            <input
                type="password"
                id="passwordCheck"
                name="passwordCheck"
                onFocus={()=>setErrorMessage(null)}
                className="bg-white border rounded-xl h-10 px-4"
                {...register("passwordCheck", {required: true})}
            ></input>
          </div>
          {errorMessage && (
              <div className="text-center p-3 bg-red-400 text-white rounded-2xl border-red-500 border">
                {errorMessage}
              </div>
          )}
        </div>
        <div>
          <button
              type="submit"
              className="bg-lime-500 text-white font-bold w-full h-12 rounded-2xl"
          >
            회원가입
          </button>
        </div>
      </form>
      <div className="text-center">또는</div>
      <div className="flex justify-between items-center">
        <button className="w-14 h-14">
          <img src={naver} alt="naver"></img>
        </button>
        <button className="w-14 h-14">
          <img src={google} className="w-full h-full"></img>
        </button>
      </div>
    </>
  );
};

export default RegisterForm;
