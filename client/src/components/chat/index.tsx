"use client"

import { useState, useRef, useEffect, Fragment } from "react";
import ChatInputField from "./input";
import socket from "@/lib/socket";
import { MessageBox } from "./message";

export interface Message { userId: string; username: string; content: string; }

export default function ChatPage({ roomId, currentUser }: { players: { id: string; username: string|null; winner: boolean|null; }[]; roomId: string; currentUser: { id: string; username: string; } }) {
    const [input, setInput]=useState("");
    const [messages, setMessages]=useState<Message[]>([]);

    const formRef=useRef<HTMLFormElement>(null);
    const inputRef=useRef<HTMLTextAreaElement>(null);

    const handleSubmit=(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        socket.emit("message", {
            roomId: roomId,
            userId: currentUser.id,
            username: currentUser.username,
            content: input
        });
        setMessages((prev) => [...prev, { userId: currentUser.id, username: currentUser.username, content: input }]);
        setInput("");
    };

    const messagesEndRef=useRef<HTMLDivElement>(null);

    const scrollToBottom=() => {

        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        socket.emit("joinRoom", {
            roomId: roomId,
            userId: currentUser.id,
            username: currentUser.username
        });
    }, [roomId, currentUser]);

    useEffect(
        () => {
            socket.on("incomingMessage", (messageInfo) => {
                setMessages(prev => [...prev, messageInfo as Message]);
            });
        },
        []
    );

    return (
        <>
            <div className="mt-8 pt-8 w-full">
                {
                    messages.map((message, index) => (
                        <Fragment key={index}>
                            <MessageBox self={message.userId===currentUser.id} {...message} />
                            <div ref={messagesEndRef} />
                        </Fragment>
                    ))
                }
            </div>

            <div className="fixed bottom-0 flex bg-background w-full flex-col items-center space-y-3 p-5 pb-3 md:px-0">
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="relative w-full max-w-screen-md rounded-xl border border-border px-4 pb-2 pt-3 shadow-lg sm:pb-3 sm:pt-4"
                >
                    <ChatInputField input={input} setInput={setInput} inputRef={inputRef} formRef={formRef} />
                </form>
            </div>
        </>
    );
}