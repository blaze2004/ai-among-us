import { env } from "@/config/env";
import { io } from "socket.io-client";

const socket = io(env.NEXT_PUBLIC_SOCKET_URL)

export default socket;