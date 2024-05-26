"use client";

import { Button } from "@/components/ui/button";
import { getRoomPlayers } from "@/lib/game/functions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { joinGameRoom } from "../../lib/game/functions";
import { generateName } from "../../lib/names-generator";

export default function Page({ searchParams }: { searchParams: { [key: string]: string|string[]|undefined } }) {

    const roomId=searchParams.roomId as string|undefined;
    const router=useRouter();
    const username=generateName();

    const [players, setPlayers]=useState<{
        userId: string;
        username: string;
    }[]>([]);

    if (!roomId) {
        router.push('/');
    }

    useEffect(() => {

        const joinRoom=async () => {
            if (!roomId) return;
            const players=await getRoomPlayers(roomId);

            if (players) {
                if (players.length<4) {
                    if (!await joinGameRoom(roomId, username)) {
                        toast.error('Failed to join room');
                        setTimeout(() => {
                            router.push('/');
                        }, 1000);
                    }
                }
                else {
                    toast.error('Room is full');
                    setTimeout(() => {
                        router.push('/');
                    }, 1000);
                }
            }
        }

        joinRoom();

        const fetchPlayers=setInterval(async () => {
            if (!roomId) return;
            const players=await getRoomPlayers(roomId);
            if (players) {
                setPlayers(players);
                if (players.length==4) {
                    clearInterval(fetchPlayers);
                    router.push(`/chat?roomId=${roomId}`);
                }
            }
        }, 1000);

        return () => clearInterval(fetchPlayers);
    });

    return (
        <div>
            <div className={'flex flex-col items-center justify-center min-h-screen snap-always snap-center p-4'}>
                <h1
                    className={
                        'text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary text-center mb-8 max-w-screen-md'
                    }
                >
                    Waiting for players to join...
                </h1>
                <p
                    className={
                        'text-lg sm:text-xl md:text-2xl text-muted-foreground text-center mb-12 max-w-screen-sm'
                    }
                >
                    Share the link with your friends to join the game room.
                </p>
                <Button onClick={async () => {
                    await navigator.clipboard.writeText(`${window.location.origin}/lobby?roomId=${roomId}`);
                    toast.success('Link copied to clipboard');
                }}>
                    Copy Link
                </Button>

                <div className='mt-8'>
                    <h2 className='text-2xl font-bold'>Players</h2>
                    <ul className='mt-4'>
                        {players.map((player) => (
                            <li key={player.userId} className='text-lg'>{player.username}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}