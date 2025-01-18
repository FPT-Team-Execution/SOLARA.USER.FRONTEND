"use client"

import useUserStore from "@/zustand/useUserStore"
import UserLevelCard from "../ui/UserLevelCard";
import streakIcon from "../../../public/fire.png";
import totalXpIcon from "../../../public/flash-sale.png";
import achievementAmountIcon from "../../../public/medal.png";
import currentLevelIcon from "../../../public/trophy.png";
import { LevelTitle } from "@/enums/levelTitle";
import LoadingBar from "../ui/LoadingBar";
import { getLevelDescription } from "@/utils/string/userLevelFormat";
import { UserLevel } from "@/enums/userLevel";
import { useState } from "react";
import { Drawer } from "antd";
import UserLevelSpace from "./UserLevelSpace";

const LearningProgress = () => {

    const { userLevel, getUserLevel } = useUserStore();

    const [open, setOpen] = useState<boolean>(false);

    const showDrawer = () => {
        if (!userLevel) {
            getUserLevel();
        }
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            {
                !userLevel
                    ?
                    <div className="flex mx-auto items-center justify-center">
                        <LoadingBar />
                    </div>
                    :
                    <div onClick={showDrawer} className="flex mx-auto text-black hover:bg-green-600 hover:text-white rounded duration-300 cursor-pointer">
                        <UserLevelCard levelIcon={streakIcon} levelTitle={LevelTitle.streak} levelValue={userLevel?.streak} />
                        <UserLevelCard levelIcon={totalXpIcon} levelTitle={LevelTitle.totalXp} levelValue={userLevel?.totalXp} />
                        <UserLevelCard levelIcon={currentLevelIcon} levelTitle={LevelTitle.currentLevel} levelValue={getLevelDescription(userLevel?.currentLevel as keyof typeof UserLevel)} />
                        <UserLevelCard levelIcon={achievementAmountIcon} levelTitle={LevelTitle.achievementAmount} levelValue={userLevel?.achievementAmount} />
                    </div>

            }
            <>
                <Drawer title="Tiến trình học tập" onClose={onClose} open={open}>
                    <UserLevelSpace/>
                </Drawer>
            </>
        </>

    )
}

export default LearningProgress
