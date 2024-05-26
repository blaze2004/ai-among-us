"use client"
import CountUp from 'react-countup';
import { buttonVariants } from '@/components/ui/button'
import { PlayIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
// import { useEffect } from 'react';
import { useSession } from "next-auth/react";

const StatsPage=() => {
    interface player {
        name: string,
        no_of_matches: number,
        wins: number
    }
    const playerstat: player={
        name: "test",
        no_of_matches: 50,
        wins: 25
    }

    const session=useSession();

    // useEffect(() => {
    //     if (session.status === 'authenticated') {
    //         const stats = 
    //     }
    // }, [session])


    if (session.status==='loading') {
        return <div>Loading...</div>
    }

    if (session.status==='unauthenticated') {
        return <div>Access Denied</div>
    }

    return (
        <>

            <div className={'flex flex-col items-center justify-center min-h-screen snap-always snap-center p-4'}>
                <h1 className={
                    'text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary text-center mb-8 max-w-screen-md border-2 mx-4 p-2'}>
                    Player name : {playerstat.name}
                </h1>
                <div className={'flex'}>
                    <h2 className={

                        'flex-none text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary text-center mb-8 max-w-screen-md border-2 mx-4 p-2'}>
                        Matches:  <CountUp start={0} end={playerstat.no_of_matches}></CountUp>
                    </h2>
                    <h2 className={
                        'flex-none text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary text-center mb-8 max-w-screen-md border-2 mx-4 p-2'}>
                        Wins: <CountUp start={0} end={playerstat.wins}></CountUp>
                    </h2>
                    <h2 className={
                        'flex-none text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary text-center mb-8 max-w-screen-md border-2 mx-4 p-2'}>
                        loses: <CountUp start={0} end={playerstat.no_of_matches-playerstat.wins}></CountUp>
                    </h2>



                </div>
                <h1 className={
                    'text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary text-center mb-8 max-w-screen-md border-2 mx-4 p-2'}>
                    Win Rate : <CountUp start={0} end={(playerstat.wins/playerstat.no_of_matches)*100}></CountUp>
                </h1>
                <Link href={"/new"} className={buttonVariants({ size: "lg" })}>
                    <PlayIcon className='mr-2 h-10 w-10' />
                    <h2>Play More</h2>
                </Link>
            </div>
        </>


    )
}
export default StatsPage;