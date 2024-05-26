"use client"

import ChatInputField from "./input";
import { useState, useRef } from "react";

export default function ChatPage() {
    const [input, setInput]=useState("");
    const formRef=useRef<HTMLFormElement>(null);
    const inputRef=useRef<HTMLTextAreaElement>(null);

    const handleSubmit=(e: React.FormEvent<HTMLFormElement>) => { };

    return (
        <>
            {/* Chat Messages */}

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