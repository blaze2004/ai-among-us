"use client"

import { useEffect, useState } from "react";
import socket from "@/lib/connection/socket-connection";
import { useRecoilState, useRecoilValue } from "recoil";
import { messagesArray, usernameAtom } from "@/app/atoms/atoms";
import Message from "./message";

const ChatMessages = () => {

    const [messages, setMessages] = useRecoilState(messagesArray);

    const username = useRecoilValue(usernameAtom);


   useEffect(
    () => {
        socket.on("displayingMessage", (messageInfo) => {
            setMessages(prev => [...prev, messageInfo])
            console.log(messageInfo);
        })
    },
    [socket]
   );

    return (
        <div className="overflow-y-scroll overflow-x-hidden">
            {messages.map((message, index) => {
                return(
                <Message key={index} message={message} />
                );
            })}
        </div>
    )
}

export default ChatMessages;