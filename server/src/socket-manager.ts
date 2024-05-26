import type { Socket } from "socket.io";
import { Request } from "express";
import { ChatEvents, JoinRoomPayload, MessagePayload } from "./types";

const socketManager=(socket: Socket) => {

    const req=socket.request as Request;
    console.log(`Socket id: ${socket.id} is online.`);

    socket.on(ChatEvents.DISCONNECT, () => {
        console.log(`Socket id: ${socket.id} is offline.`);
    });

    socket.on(ChatEvents.JOIN_ROOM, (payload: JoinRoomPayload) => {
        socket.join(payload.roomId);
        console.log(`Socket id: ${socket.id} joined room: ${payload.roomId}`);
    });

    socket.on(ChatEvents.MESSAGE, (payload: MessagePayload) => {
        socket.to(payload.roomId).emit(ChatEvents.INCOMING_MESSAGE, payload);
        console.log(`Socket id: ${socket.id} sent message to room: ${payload.roomId}`)
    });

}

export default socketManager;