import ChatPage from "@/components/chat";
import Header from "@/components/chat/header";
import e from "../../../dbschema/edgeql-js";
import dbClient from "@/lib/db/client";
import { getServerSession } from "next-auth";
import { notFound, redirect } from 'next/navigation'

export default async function Page({ searchParams }: { searchParams: { [key: string]: string|string[]|undefined } }) {

    const roomId=searchParams.roomId as string|undefined;

    if (!roomId) {
        notFound();
    }

    const session=await getServerSession();
    const user=await e.select(e.User, () => ({
        id: true,
        filter_single: { email: session!.user!.email! }
    })).run(dbClient);

    if (!user) {
        notFound();
    }

    const roomInfo=await e.select(e.Room, (room) => ({
        name: true,
        id: true,
        players: {
            id: true,
            "@username": true,
            "@winner": true
        },
        filter_single: e.op(room.id, "=", e.uuid(roomId))
    })).run(dbClient);

    if (!roomInfo) {
        notFound();
    }

    const players=roomInfo.players.map((player) => ({
        id: player.id,
        username: player["@username"],
        winner: player["@winner"]
    }));

    if (players.length!=4) {
        redirect(`/lobby?roomId=${roomId}`)
    }

    const currentUser: { id: string; username: string }={
        id: user.id,
        username: players.filter((player) => player.id===currentUser.id)[0].username!
    }

    return (
        <main className="flex flex-col items-center justify-between pb-40">
            <Header name={roomInfo.name} />
            <ChatPage roomId={roomInfo.id} players={players} currentUser={currentUser} />
        </main>
    );
}