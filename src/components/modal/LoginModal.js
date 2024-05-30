import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the root element for accessibility

const LoginModal = ({ isOpen, onRequestClose }) => {
  const handleLogin = () => {
    // Handle login logic here
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Login Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
        overlay: { zIndex: 1000 },
      }}
    >
      <form
        className="flex flex-col justify-between gap-6"
        //onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="username">이메일</label>
            <input
              type="email"
              id="username"
              name="username"
              //{...register("username", { required: true })}
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
              //{...register("password", { required: true })}
            ></input>
            <div className="text-right">
              <button className="text-xs">비밀번호를 잊으셨나요?</button>
            </div>
          </div>
          {/* {code === 401 ? (
            <>
              {" "}
              <div className="text-center p-3 bg-red-400 text-white rounded-2xl border-red-500 border">
                계정을 찾을 수 없습니다.
              </div>
            </>
          ) : (
            <></>
          )} */}
        </div>
        <div>
          <button
            type="submit"
            className="bg-lime-500 text-lime-800 font-bold w-full h-12 rounded-2xl"
          >
            로그인
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default LoginModal;
