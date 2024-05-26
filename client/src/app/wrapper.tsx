"use client"

import { RecoilRoot } from "recoil";

const Wrapper = ({children}: { children: React.ReactNode }) => {
    return <RecoilRoot>{children}</RecoilRoot>
}

export default Wrapper;