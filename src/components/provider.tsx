import { LayoutProps } from "@/types";
import { ThemeProvider } from "next-themes";

export const Provider=({ children }: LayoutProps) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    );
}