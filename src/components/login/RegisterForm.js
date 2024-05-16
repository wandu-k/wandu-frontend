import { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import { useForm } from "react-hook-form";
import naver from "../../images/login/naver.png";
import google from "../../images/login/google.png";

const RegisterForm = () => {
  const { register, handleSubmit, error } = useForm();

  const { login } = useContext(LoginContext);

  const onSubmit = (data) => {
    console.log(data);

    const username = data.username;
    const password = data.password;

    login(username, password);
  };
  return (
    <>
      <form
        className="flex flex-col justify-between gap-12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="username">이메일</label>
            <input
              type="email"
              id="username"
              name="username"
              {...register("username", { required: true })}
              className="bg-white border rounded-xl h-10 px-4"
            ></input>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-white border rounded-xl h-10 px-4"
              {...register("password", { required: true })}
            ></input>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">비밀번호 확인</label>
            <input
              type="password"
              id="passwordCheck"
              name="passwordCheck"
              className="bg-white border rounded-xl h-10 px-4"
              {...register("passwordCheck", { required: true })}
            ></input>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">닉네임</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              className="bg-white border rounded-xl h-10 px-4"
              {...register("nickname", { required: true })}
            ></input>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="bg-lime-500 text-lime-800 font-bold w-full h-12 rounded-2xl"
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
