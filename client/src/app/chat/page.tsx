import ChatPage from "@/components/chat";
import Header from "@/components/chat/header";
import e from "../../../dbschema/edgeql-js";
import { getRoomPlayers } from "@/lib/game/functions";
import dbClient from "@/lib/db/client";
import socket from "@/lib/socket";
import { getServerSession } from "next-auth";
import { notFound } from 'next/navigation'

export default async function Page({ searchParams }: { searchParams: { [key: string]: string|string[]|undefined } }) {

    const roomId=searchParams.roomId as string|undefined;

    if (!roomId) {
        notFound();
    }

    const roomInfo=await e.select(e.Room, (room) => ({
        name: true,
        id: true,
        filter_single: e.op(room.id, "=", e.uuid(roomId))
    })).run(dbClient);

    if (!roomInfo) {
        notFound();
    }

    const players=await getRoomPlayers(roomId);

    if (!players) {
        notFound();
    }

    const session=await getServerSession();

    if (!session) {
        notFound();
    }

    const currentUser=await e.select(e.User, (user) => ({
        filter_single: e.op(user.email, "=", session.user.email),
        id: true
    })).run(dbClient);

    if (!currentUser) {
        redirect('/');
    }

    currentUser["username"] = players.filter((player)=>player.id === currentUser.id)[0].username;

    return (
        <main className="flex flex-col items-center justify-between pb-40">
            <Header name={roomInfo.name} />
            <ChatPage roomId={roomInfo.id} players={players} currentUser={currentUser} />
        </main>
    );
}