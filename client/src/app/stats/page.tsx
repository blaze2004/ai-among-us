import { buttonVariants } from '@/components/ui/button'
import { PlayIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { NumberCountAnimation } from '@/components/count-up';
import { getServerSession } from 'next-auth';
import dbClient from "@/lib/db/client";

interface Player {
    email: string,
    no_of_matches: number,
    wins: number
}

const StatsPage=async () => {

    const session=(await getServerSession())!;

    try {
        const matches=(await dbClient.query(`
        select Room {
            name,
            players: {
              email,
              @winner
            } filter .email = <str>$email
          }
          filter any(.players.email = <str>$email);          
        `, { email: session.user!.email! })) as unknown[] as { id: string; name: string; players: { email: string; "@winner": boolean; }[] }[];

        console.log(matches);

        const playerstat: Player={
            email: session.user!.email!,
            no_of_matches: matches.length,
            wins: matches.filter((match) => match.players[0]["@winner"]).length,
        }

        return (
            <div>
                <div className={'flex flex-col items-center justify-center min-h-screen snap-always snap-center p-4'}>
                    <h1 className={
                        'text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary text-center mb-8 max-w-screen-md border-2 mx-4 p-2'}>
                        Player Email: <span className='text-2xl text-muted-foreground'>{playerstat.email}</span>
                    </h1>
                    <div className={'flex'}>
                        <h2 className={

                            'flex-none text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary text-center mb-8 max-w-screen-md border-2 mx-4 p-2'}>
                            Matches:  <NumberCountAnimation className='inline' limit={playerstat.no_of_matches}></NumberCountAnimation>
                        </h2>
                        <h2 className={
                            'flex-none text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary text-center mb-8 max-w-screen-md border-2 mx-4 p-2'}>
                            Wins: <NumberCountAnimation className='inline' limit={playerstat.wins}></NumberCountAnimation>
                        </h2>
                        <h2 className={
                            'flex-none text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary text-center mb-8 max-w-screen-md border-2 mx-4 p-2'}>
                            loses: <NumberCountAnimation className='inline' limit={playerstat.no_of_matches-playerstat.wins}></NumberCountAnimation>
                        </h2>
                    </div>
                    <h1 className={
                        'text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary text-center mb-8 max-w-screen-md border-2 mx-4 p-2'}>
                        Win Rate : <NumberCountAnimation className='inline' limit={(playerstat.wins/playerstat.no_of_matches)*100}></NumberCountAnimation>
                    </h1>
                    <Link href={"/new"} className={buttonVariants({ size: "lg" })}>
                        <PlayIcon className='mr-2 h-10 w-10' />
                        <h2>Play More</h2>
                    </Link>
                </div>
            </div>
        )

    } catch (err) {
        console.error(err);
        return (
            <div>
                <h1>Something went wrong</h1>
            </div>
        )
    }
}
export default StatsPage;