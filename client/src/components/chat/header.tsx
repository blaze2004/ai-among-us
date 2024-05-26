import ThemeSelector from "../theme-changer";

export default function Header() {
    return (
        <div
            className={`fixed top-0 w-full bg-background border-b border-border z-30 transition-all`}
        >
            <div className='mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto'>
                <h2 className="font-display text-2xl font-bold drop-shadow-sm md:text-3xl">Chat Room</h2>
                <div className='flex items-center justify-center gap-1'>
                    <ThemeSelector />
                </div>
            </div>
        </div>
    );
}