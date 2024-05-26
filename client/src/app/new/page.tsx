"use client"

import { LoadingCircle } from '@/components/icons';
import { Button, buttonVariants } from '@/components/ui/button'
import { FrameIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { createNewRoom } from '@/lib/game/functions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';


export default function NewGamePage() {
    const [joining, setJoining]=useState(false);
    const [loading, setLoading]=useState(false);
    const [roomName, setRoomName]=useState('');
    const [isPrivate, setIsPrivate]=useState(false);
    const router=useRouter();

    const joinRandomRoom=async () => {
        setJoining(true);
        const roomId=await joinRandomRoom();
        setJoining(false);

        if (roomId) {
            toast.success("Room joined successfully.");
            router.push("/lobby?roomId="+roomId.id);
        } else {
            toast.error("Failed to join room. Please try again later.");
        }

    }


    if (joining) {
        return (
            <div className={'flex flex-col items-center justify-center min-h-screen snap-always snap-center p-4 gap-4'}>
                <h2
                    className={
                        'text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary text-center mb-8 max-w-screen-md'
                    }
                >
                    Joining a Random Room...
                </h2>
                <LoadingCircle />
            </div>
        );
    }

    return (
        <div className={'flex flex-col items-center justify-center min-h-screen snap-always snap-center p-4 gap-4'}>
            <div className='ring-2 ring-primary p-4 sm:p-8 rounded-lg'>
                <h1
                    className={
                        'text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary text-center mb-8 max-w-screen-md'
                    }
                >
                    New Game
                </h1>
                <div className='space-y-4'>
                    <Button size={"lg"} className='w-full' onClick={joinRandomRoom}>
                        <FrameIcon className='mr-2 h-6 w-6' />
                        Join a Random Room
                    </Button>

                    <Dialog>
                        <DialogTrigger className={cn(buttonVariants({ size: "lg", variant: "outline" }), "w-full")}>
                            <PlusCircledIcon className='mr-2 h-6 w-6' />
                            Create a New Room
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Room</DialogTitle>
                                <DialogDescription>
                                    Create a new room and invite your friends to play with you.
                                </DialogDescription>
                            </DialogHeader>
                            <div className='space-y-4'>
                                <div className="flex-col justify-center space-y-2">
                                    <Label htmlFor="room">Room Name</Label>
                                    <Input value={roomName} onChange={(e) => setRoomName(e.target.value)} name="room" placeholder={"Enter a name for your room"} />
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Label htmlFor="private">Private</Label>
                                    <Switch checked={isPrivate} onCheckedChange={(value) => setIsPrivate(value)} name="private" />
                                </div>
                                <Button type='submit' disabled={loading} size={"lg"} className='w-full' onClick={async () => {
                                    setLoading(true);
                                    const roomId=await createNewRoom({ name: roomName, isPrivate });
                                    setLoading(false);
                                    if (roomId) {
                                        toast.success("Room created successfully.");
                                        router.push("/lobby?roomId="+roomId.id)
                                    } else {
                                        toast.error("Failed to create room. Please try again later.");
                                    }
                                }}>
                                    Create Room
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>

                </div>
            </div>
        </div>
    );
}