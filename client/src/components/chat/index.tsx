"use client"

import ChatInputField from "./input";
import { useState, useRef, useEffect } from "react";
import socket from "@/lib/socket";

interface Message { userId: string; username: string; content: string; }

export default function ChatPage({ roomId, currentUser }: { players: { userId: string; username: string; }[]; roomId: string; currentUser: { id: string; username: string; } }) {
    const [input, setInput]=useState("");
    const [messages, setMessages]=useState<Message[]>([]);
    const formRef=useRef<HTMLFormElement>(null);
    const inputRef=useRef<HTMLTextAreaElement>(null);

    const handleSubmit=async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await socket.emit("message", {
            roomId: roomId,
            userId: currentUser.id,
            username: currentUser.username,
            content: input
        });
        setMessages((prev) => [...prev, { userId: currentUser.id, username: currentUser.username, content: input }]);
        setInput("");
    };

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
            {
                messages.map((message, index) => (
                    <div key={index} className={`flex items-center space-x-2 ${message.userId==currentUser.id ? "justify-end" : "justify-start"} p-2`}>
                        <div className={`flex items-center space-x-2 p-2 bg-background ${message.userId==currentUser.id ? "rounded-br-none" : "rounded-bl-none"} rounded-lg`}>
                            <p className="text-sm font-semibold text-text">{message.username}</p>
                            <p className="text-sm text-text">{message.content}</p>
                        </div>
                    </div>
                ))
            }

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