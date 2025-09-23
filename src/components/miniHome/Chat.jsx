import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import SockJS from "sockjs-client";
import { LoginContext } from "../../contexts/LoginContext";
import { MiniHomeContext } from "../../contexts/MiniHomeContext";

const Chat = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const stompClientRef = useRef(null);
  const { miniHome } = useContext(MiniHomeContext);
  const { userInfo } = useContext(LoginContext);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null); // 스크롤 제어를 위한 ref 생성
  const chatContainerRef = useRef(null); // 스크롤 컨테이너 ref 생성

  useEffect(() => {
    console.log("채팅 연결 중..");
    if (miniHome) {
      // SockJS와 STOMP 클라이언트 설정
      const socket = new SockJS("https://wookportfolio.duckdns.org:81/ws-stomp");
      const stompClient = new Client({
        webSocketFactory: () => socket,
        connectHeaders: {
          Authorization: localStorage.getItem("accessToken"), // JWT 토큰을 헤더에 포함
        },
        debug: (str) => {
          console.log(str);
        },
        onConnect: () => {
          console.log("Connected");
          // 서버로부터 메세지를 수신하는 구독 설정
          stompClient.subscribe(`/room/${miniHome.hpId}`, (message) => {
            const data = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, data]);
            console.log(data);
          });
        },
        onStompError: (frame) => {
          console.error("Broker reported error: " + frame.headers["message"]);
          console.error("Additional details: " + frame.body);
        },
      });

      stompClient.activate();
      stompClientRef.current = stompClient;
      loadChatList();

      return () => {
        if (stompClientRef.current) {
          stompClientRef.current.deactivate();
        }
      };
    }
  }, [miniHome?.hpId]);

  // 메시지가 업데이트 될 때마다 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (messagesEndRef.current && chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const loadChatList = () => {
    console.log("채팅 기록 불러오는 중..");
    axios
      .get(`https://wookportfolio.duckdns.org:81/api/user/minihome/${miniHome.hpId}/chat`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log(response.data);
        setMessages(response.data);
      })
      .catch((error) => {});
  };

  const onSubmit = (data) => {
    console.log("userInfo:", userInfo);
    data.userId = userInfo.userId;
    console.log("전송할 데이터:", data);

    console.log(data);
    // 메세지를 서버로 전송
    if (stompClientRef.current && stompClientRef.current.connected) {
      console.log("전송 준비 중");
      stompClientRef.current.publish({
        destination: `/send/${miniHome.hpId}`,
        body: JSON.stringify(data),
      });
      reset();
    }
  };

  return (
    <>
      <div className="flex flex-col h-full max-h-96 gap-4 border rounded-2xl">
        <label className="flex text-xl font-bold pt-4 pl-4 pr-4">
          실시간 채팅
        </label>
        <div
          className="grid grid-cols-1 h-full justify-end overflow-scroll gap-4 p-4"
          ref={chatContainerRef}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                "flex flex-col" +
                (msg.userId == userInfo.userId ? " items-end" : "")
              }
            >
              <Link to={`/${msg.userId}/minihome`} className={"font-bold"}>
                {msg.nickname}
              </Link>
              <div>{msg.message}</div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>
      </div>
      <div className="h-14 flex rounded-full border w-full pr-10 overflow-y-scroll relative">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="채팅 보내기"
            className="h-full w-full rounded-full p-4"
            {...register("message", { required: true })}
          ></input>
          <button type="submit" className="absolute right-6 bottom-0 top-0">
            <FontAwesomeIcon icon="fa-solid fa-paper-plane" />
          </button>
        </form>
      </div>
    </>
  );
};

export default Chat;
