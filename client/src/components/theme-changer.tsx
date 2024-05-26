"use client"

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon, LaptopIcon } from "@radix-ui/react-icons";

const ThemeSelector=() => {
    const { theme, setTheme }=useTheme()

    const themes=[
        { icon: <MoonIcon />, name: "Dark", value: "dark" },
        { icon: <SunIcon />, name: "Light", value: "light" },
        { icon: <LaptopIcon />, name: "System", value: "system" },
    ];

    return (
        <Button
            variant={"ghost"}
            className='px-2 py-2 rounded-md sm:ml-4 ring-2 ring-border'
            onClick={() => setTheme(theme==="dark"? "light":"dark")}
        >
            {theme===undefined? (
                <LaptopIcon />
            ):theme==="dark"? (
                <SunIcon />
            ):(
                <MoonIcon />
            )}
        </Button>
    );
}

export default ThemeSelector;