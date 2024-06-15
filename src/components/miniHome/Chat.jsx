import React, {useEffect, useState, useRef, useContext} from 'react';
import {useForm} from 'react-hook-form';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {MiniHomeContext} from "../../contexts/MiniHomeContext";

const Chat = () => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const [messages, setMessages] = useState([]);
    const stompClientRef = useRef(null);
    const {miniHome} = useContext(MiniHomeContext)

    useEffect(() => {
        if (miniHome) {
            // SockJS와 STOMP 클라이언트 설정
            const socket = new SockJS('http://localhost:7090/ws-stomp');
            const stompClient = new Client({
                webSocketFactory: () => socket,
                connectHeaders: {
                    Authorization: localStorage.getItem("accessToken")// JWT 토큰을 헤더에 포함
                },
                debug: (str) => {
                    console.log(str);
                },
                onConnect: () => {
                    console.log('Connected');
                    // 서버로부터 메세지를 수신하는 구독 설정
                    stompClient.subscribe(`/room/${miniHome.hpId}`, (message) => {
                        const receivedMessage = JSON.parse(message.body);
                        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                    });
                },
                onStompError: (frame) => {
                    console.error('Broker reported error: ' + frame.headers['message']);
                    console.error('Additional details: ' + frame.body);
                }
            });

            stompClient.activate();
            stompClientRef.current = stompClient;

            return () => {
                if (stompClientRef.current) {
                    stompClientRef.current.deactivate();
                }
            };
        }

    }, [miniHome]);

    const onSubmit = (data) => {

        console.log(data);
        // 메세지를 서버로 전송
        if (stompClientRef.current && stompClientRef.current.connected) {
            console.log("전송 준비 중")
            stompClientRef.current.publish({
                destination: `/send/${miniHome.hpId}`,
                body: JSON.stringify(data)
            });
            reset();
        }
    };

    return (
        <>
            <div className="flex flex-col h-full gap-4 border rounded-2xl p-4">
                <label className="text-xl font-bold">실시간 채팅</label>
                <div className="flex flex-col h-full justify-end overflow-auto">
                    {messages.map((msg, index) => (
                        <div key={index} className="p-2">
                            {msg.message}
                        </div>
                    ))}
                </div>
            </div>
            <div className="h-14 flex rounded-full border w-full pr-10 overflow-hidden relative">
                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        placeholder="채팅 보내기"
                        className="h-full w-full rounded-full p-4"
                        {...register("message", {required: true})}
                    ></input>
                    <button type="submit" className="absolute right-6 bottom-0 top-0">
                        <FontAwesomeIcon icon="fa-solid fa-paper-plane"/>
                    </button>
                </form>
            </div>
        </>
    );
};

export default Chat;