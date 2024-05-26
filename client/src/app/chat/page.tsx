import ChatPage from "@/components/chat";
import Header from "@/components/chat/header";
import dbClient from "@/lib/db/client";
import { generateName } from "@/lib/names-generator";
import e from "../../../dbschema/edgeql-js";
import { redirect } from "next/navigation";

export default async function Page({ searchParams }: { searchParams: { [key: string]: string|string[]|undefined } }) {

    const roomId=searchParams.roomId as string|undefined;

    if (!roomId) {
        redirect('/');
    }

    const roomInfo=await e.select(e.Room, (room) => ({
        name: true,
        filter_single: e.op(room.id, "=", e.uuid(roomId))
    }));

    const players=await getRoomPlayers(roomId);

    if (!players) {
        redirect('/');
    }

    return (
        <main className="flex flex-col items-center justify-between pb-40">
            <Header />
            <ChatPage />
        </main>
    );
}