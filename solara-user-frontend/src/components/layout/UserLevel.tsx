"use client"

import useUserStore from "@/zustand/useUserStore"
import UserLevelCard from "../ui/UserLevelCard";
import streakIcon from "../../../public/fire.png";
import totalXpIcon from "../../../public/flash-sale.png";
import achievementAmountIcon from "../../../public/medal.png";
import currentLevelIcon from "../../../public/trophy.png";
import { LevelTitle } from "@/enums/levelTitle";

const UserLevel = () => {

    const { userLevel } = useUserStore();

    return (
        <div className="flex mx-auto">
            <UserLevelCard levelIcon={streakIcon} levelTitle={LevelTitle.streak} levelValue={userLevel?.streak} />
            <UserLevelCard levelIcon={totalXpIcon} levelTitle={LevelTitle.totalXp} levelValue={userLevel?.totalXp} />
            <UserLevelCard levelIcon={currentLevelIcon} levelTitle={LevelTitle.currentLevel} levelValue={userLevel?.currentLevel} />
            <UserLevelCard levelIcon={achievementAmountIcon} levelTitle={LevelTitle.achievementAmount} levelValue={userLevel?.achievementAmount} />
        </div>

    )
}

export default UserLevel
