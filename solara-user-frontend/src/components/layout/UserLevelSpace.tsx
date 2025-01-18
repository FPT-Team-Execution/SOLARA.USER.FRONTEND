"use client"

import useUserStore from "@/zustand/useUserStore"
import UserLevelBox from "../ui/UserLevelBox";
import { getLevelDescription } from "@/utils/string/userLevelFormat";
import LoadingBar from "../ui/LoadingBar";
import streakIcon from "../../../public/fire.png";
import totalXpIcon from "../../../public/flash-sale.png";
import achievementAmountIcon from "../../../public/medal.png";
import currentLevelIcon from "../../../public/trophy.png";
import { LevelTitle } from "@/enums/levelTitle";
import { UserLevel } from "@/enums/userLevel";

const UserLevelSpace = () => {
    const { userLevel } = useUserStore();
    return (
        <>
            {
                userLevel ?
                    <div className="space-y-4">
                        <div className="flex flex-wrap w-full gap-4">
                            <div className="w-full flex gap-4 text-nowrap">
                                <div className="w-2/4">
                                    <UserLevelBox levelIcon={streakIcon} levelTitle={LevelTitle.streak} levelValue={userLevel?.streak} />
                                </div>
                                <div className="w-2/4">
                                    <UserLevelBox levelIcon={totalXpIcon} levelTitle={LevelTitle.totalXp} levelValue={userLevel?.totalXp} />
                                </div>
                            </div>
                            <div className="w-full flex gap-4 text-nowrap">
                                <div className="w-2/4">
                                    <UserLevelBox levelIcon={currentLevelIcon} levelTitle={LevelTitle.currentLevel} levelValue={getLevelDescription(userLevel?.currentLevel as keyof typeof UserLevel)} />
                                </div>
                                <div className="w-2/4">
                                    <UserLevelBox levelIcon={achievementAmountIcon} levelTitle={LevelTitle.achievementAmount} levelValue={userLevel?.achievementAmount} />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-full p-4 bg-gray-100 rounded-lg">
                            <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                                <span>{getLevelDescription(userLevel?.currentLevel as keyof typeof UserLevel)}</span>
                                <span>{getLevelDescription(userLevel?.nextLevel as keyof typeof UserLevel)}</span>
                            </div>
                            <div className="w-full bg-gray-300 rounded-full h-2.5 relative">
                                <div
                                    className="bg-yellow-400 h-2.5 rounded-full"
                                    style={{ width: `${userLevel!.currentXp / userLevel!.thresholdXp * 100}%` }}
                                ></div>
                            </div>
                            <div className="mt-2 text-xs text-gray-600">
                                {userLevel?.currentXp}/{userLevel?.thresholdXp} XP
                            </div>
                        </div>
                    </div>
                    :
                    <>
                        <LoadingBar />
                    </>
            }
        </>
    )
}

export default UserLevelSpace
