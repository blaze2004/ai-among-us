import { useRecoilValue } from "recoil";
import { usernameAtom } from "@/app/atoms/atoms";

const Message = ({message}: any) => {
    const username = useRecoilValue(usernameAtom);
    return (
        <div className={`flex ${message.username == username ? "justify-end" : "justify-start"} m-5`}>
            <div className={`${message.username == username ? "bg-white border-[1px] border-black text-black" : "bg-black text-white"} p-4 rounded-2xl max-w-xs break-words`}>
            {message.messageContent}
            </div>
        </div>
    );
}

export default Message;