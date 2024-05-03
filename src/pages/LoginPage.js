import loginBackground from "../images/LoginBackground.webp";

const LoginPage = () => {
  return (
    <>
      <div className="absolute w-full h-full -z-50">
        <img
          src={loginBackground}
          alt="Login Background"
          className="absolute w-full h-full object-cover opacity-50"
        />
      </div>
      <div className="container flex my-auto mx-auto p-10 h-dvh gap-4">
        <div className="flex flex-col justify-center items-center w-full">
          <div>
            <h1 className="font-black text-8xl tracking-tighter">
              추억을 <br></br>
              <div className="text-lime-500">심다.</div>
            </h1>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <div className="w-96 h-auto rounded-2xl backdrop-blur-md bg-white/75 border-slate-100 shadow-light p-6 flex flex-col gap-12">
            <div className="flex justify-center">
              <h1 className="font-black text-4xl tracking-tighter text-lime-800">
                완두콩
              </h1>
            </div>
            <form className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <label>이메일</label>
                  <input
                    type="email"
                    className="bg-white border rounded-xl h-10 px-4"
                  ></input>
                </div>
                <div className="flex flex-col">
                  <label>비밀번호</label>
                  <input
                    type="password"
                    className="bg-white border rounded-xl h-10 px-4"
                  ></input>
                </div>
              </div>
              <div>
                <button className="bg-lime-500 text-lime-800 font-bold w-full h-14 rounded-2xl">
                  로그인
                </button>
              </div>
              <div>또는</div>
              <div>카카오톡</div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
