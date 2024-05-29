import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import {Message} from ".";

function getColorForUsername(username) {
    const colors = ['#4A90E2', '#A0AABF', '#7ED321', '#9B51E0'];
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
}

export const MessageBox=({ username, content, self }: Message&{self: boolean}) => {
    return (
        <div
            className={cn(
                "flex w-full items-center justify-center py-4 px-4",
            )}>
            <div className={cn("flex w-full max-w-screen-md items-start px-5 sm:px-0",
                self? "flex-row-reverse":"flex-col"
            )}>
                {
                    !self && (
                        <p style={{color: getColorForUsername(username)}}>{username}</p>
                    )
                }
                <ReactMarkdown
                    className={cn("prose mt-1 text-xl break-words prose-p:leading-relaxed text-left rounded-lg", self? "bg-secondary p-4 max-w-screen-sm":"")}
                    remarkPlugins={[remarkGfm]}
                    components={{
                        a: (props) => (
                            <a {...props} target="_blank" rel="noopener noreferrer" />
                        )
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    )
}