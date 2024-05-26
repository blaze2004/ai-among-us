import { atom } from "recoil";

export const usernameAtom = atom({
    key: 'usernameAtom',
    default: ""
});

export const roomIdAtom = atom({
    key: 'roomIdAtom',
    default: ""
});

export const messagesArray = atom({
    key: 'messagesArrayAtom',
    default: [],
})