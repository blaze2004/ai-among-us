"use server"

import dbClient from "@/lib/db/client";
import e from "../../../dbschema/edgeql-js";
import { getServerSession } from "next-auth";

export const createNewRoom=async ({ name, isPrivate }: { name: string, isPrivate: boolean }) => {

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
            players: {
                "@username": true,
                "@winner": true,
                id: true
            },
        })).run(dbClient);

        if(players){
            const playersInfo = players.players.map((player)=>({
                id: player.id,
                username: player["@username"],
                winner: player["@winner"]
            }));
            console.log(playersInfo);
            return playersInfo;
        }
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

        await dbClient.query(`
        UPDATE Room
      FILTER .id = <uuid>$roomId
      SET {
        players += (
          SELECT User {
            @username := <str>$username
          }
          FILTER .email = <str>$email
          LIMIT 1
        )
      }`, {roomId, username, email: session.user.email})

        return true;

    } catch (err) {
        console.error("Error joining room: ", err);
    }
}