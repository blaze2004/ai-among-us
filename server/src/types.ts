export enum ChatEvents {
    MESSAGE="message",
    INCOMING_MESSAGE="incomingMessage",
    JOIN_ROOM="joinRoom",
    CONNECTION="connection",
    DISCONNECT="disconnect"
}

export interface JoinRoomPayload { 
    roomId: string;
    userId: string;
}

export interface MessagePayload {
    roomId: string;
    userId: string;
    content: string;
}