import Textarea from "react-textarea-autosize";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Dispatch, RefObject, SetStateAction } from "react";

interface ChatInputProps {
    input: string;
    setInput: Dispatch<SetStateAction<string>>;
    formRef: RefObject<HTMLFormElement>;
    inputRef: RefObject<HTMLTextAreaElement>;
}

const ChatInputField=({ input, setInput, inputRef, formRef }: ChatInputProps) => {
    const disabled=input.length===0;
    return (
        <div>
            <Textarea
                ref={inputRef}
                tabIndex={0}
                required
                rows={1}
                maxRows={5}
                autoFocus
                placeholder="Send a message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key==="Enter"&&!e.shiftKey) {
                        formRef.current?.requestSubmit();
                        e.preventDefault();
                    }
                }}
                spellCheck={false}
                className="w-full px-2 focus:outline-none bg-transparent"
            />
            <button
                type="submit"
                className={cn(
                    "absolute inset-y-0 right-3 my-auto flex h-8 w-8 items-center justify-center rounded-full transition-all",
                    disabled
                        ? "bg-white"
                        :"bg-primary dark:bg-secondary hover:bg-primary/20",
                    disabled? "cursor-not-allowed":""
                )}
                disabled={disabled}
            >
                <ArrowUpIcon
                    className={cn(
                        "h-4 w-4",
                        input.length===0? "text-gray-300":"text-white",
                    )}
                />
            </button>
        </div>
    )
}

export default ChatInputField;