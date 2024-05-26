import ChatPage from "@/components/chat";
import Header from "@/components/chat/header";
import e from "../../../dbschema/edgeql-js";
import { redirect } from "next/navigation";
import { getRoomPlayers } from "@/lib/game/functions";
import dbClient from "@/lib/db/client";
import socket from "@/lib/socket";
import { getServerSession } from "next-auth";

export default async function Page({ searchParams }: { searchParams: { [key: string]: string|string[]|undefined } }) {

    const roomId=searchParams.roomId as string|undefined;

    if (!roomId) {
        redirect('/');
    }

    const roomInfo=await e.select(e.Room, (room) => ({
        name: true,
        id: true,
        filter_single: e.op(room.id, "=", e.uuid(roomId))
    })).run(dbClient);

    if (!roomInfo) {
        redirect('/');
    }

    const players=await getRoomPlayers(roomId);

    if (!players) {
        redirect('/');
    }

    const session=await getServerSession();

    if (!session) {
        redirect('/');
    }

    const currentUser=e.select(e.User, (user) => ({
        filter_single: e.op(user.email, "=", session.user.email),
        id: true
    })).run(dbClient);

    if (!currentUser) {
        redirect('/');
    }

    return (
        <main className="flex flex-col items-center justify-between pb-40">
            <Header name={roomInfo.name} />
            <ChatPage roomId={roomInfo.id} players={players} currentUserId={currentUser.id} />
        </main>
    );
}