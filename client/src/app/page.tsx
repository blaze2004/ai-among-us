import { buttonVariants } from '@/components/ui/button'
import { PlayIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const HomePage=() => {

  return (
    <div>
      <div className={'flex flex-col items-center justify-center min-h-screen snap-always snap-center p-4'}>
        <h1
          className={
            'text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary text-center mb-8 max-w-screen-md'
          }
        >
          AI Among Us
        </h1>
        <p
          className={
            'text-lg sm:text-xl md:text-2xl text-muted-foreground text-center mb-12 max-w-screen-sm'
          }
        >
          Find the AI among other humans. A simple game to test your AI content detection skills.
        </p>
        <Link href={"/dashboard"} className={buttonVariants({ size: "lg" })}>
          <PlayIcon className='mr-2 h-6 w-6' />
          Play Now
        </Link>
      </div>

    </div>)
}

export default HomePage;