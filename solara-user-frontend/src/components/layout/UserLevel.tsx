"use client"

import useUserStore from "@/zustand/useUserStore"
import { useRequest } from "ahooks";

const UserLevel = () => {

    const { userLevel } = useUserStore();

    return (
        <div>
        </div>
    )
}

export default UserLevel
