"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { io } from "socket.io-client";
import socket from "@/lib/connection/socket-connection";
import { useRecoilState, useRecoilValue } from "recoil";
import { roomIdAtom, usernameAtom } from "@/app/atoms/atoms";

const JoinButton = () => {

    const username = useRecoilValue(usernameAtom);
    const roomId = useRecoilValue(roomIdAtom);

    const emitUserInfo = () => {
        const userInfo = {
            username: username,
            roomId: roomId
        }
        socket.emit("join", userInfo);
    }

    return (
        <Link className="w-full" href="/chat"><Button onClick={emitUserInfo} className="rounded-full w-full text-lg hover:bg-white hover:text-black">Join</Button></Link>
    );
}

export default JoinButton;