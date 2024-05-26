"use server"

import dbClient from "@/lib/db/client";
import e from "../../../dbschema/edgeql-js";
import { getServerSession } from "next-auth";

export const joinRandomRoom=async () => {
    const session=await getServerSession();

    if (!session) {
        return;
    }

    try {
        const room=await e.select(e.RoomUser, (roomUser) => ({
            limit: 1,
            filter_single: e.op(e.group(e.RoomUser, (roomUserGroup) => ({
                by: { roomId: roomUserGroup.roomId },
                players: e.count(roomUserGroup.userId)
            })).players, "<", 4),
        })).run(dbClient);

        return room;
    } catch (err) {
        console.error(err);
    }

}

export const createNewRoom=async ({ name, isPrivate }: { name: string, isPrivate: boolean }) => {

    const session=await getServerSession();

    if (!session) {
        return;
    }

    if (name.length===0) {
        return;
    }

    try {
        const room=await e.insert(e.Room, {
            name: name,
            private: isPrivate,
        }).run(dbClient);

        return room;
    } catch (err) {
        console.error(err);
    }
}

export const getRoomPlayers=async (roomId: string) => {
    try {
        const players=await e.select(e.Room, (room) => ({
            filter_single: e.op(room.id, "=", e.uuid(roomId)),
            users: true,
        })).run(dbClient);

        return players;
    } catch (err) {
        console.error(err);
    }
}

export const joinGameRoom=async (roomId: string, username: string) => {

    const session=await getServerSession();

    if (!session) {
        return;
    }

    try {

        const userRoomRecord = await e.select(e.RoomUser, (roomUser) => ({
            id: true,
            filter_single: e.op(e.op(roomUser.roomId, "=", e.uuid(roomId)), "AND", e.op(roomUser.username, "=", username)),
        })).run(dbClient);

        if(userRoomRecord.length > 0) {
            return true;
        }
        
        await e.insert(e.RoomUser, {
            room: e.select(e.Room, (room) => ({
                filter_single: e.op(room.id, "=", e.uuid(roomId))
            })),
            user: e.select(e.User, (user) => ({
                filter_single: e.op(user.email, "=", session.user.email)
            })),
            username: username
        }).run(dbClient);

        return true;

    } catch (err) {
        console.error(err);
    }
}