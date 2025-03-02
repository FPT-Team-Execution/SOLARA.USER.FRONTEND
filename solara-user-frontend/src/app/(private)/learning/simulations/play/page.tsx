"use client"

import Spinner from '@/components/ui/Spinner';
import StatProgressBar from '@/components/ui/StatProgressBar';
import { POST_SIMULATION_VIRTUAL_API } from '@/constants/apis';
import { IBaseModel } from '@/interfaces/general';
import { Promt, VirtualGameState } from '@/types/simulation';
import axiosClient from '@/utils/axios/axiosClient';
import { useRequest } from 'ahooks';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const Page = () => {

    const [userAction, setUserAction] = useState<string>("");
    const [gameState, setGameState] = useState<VirtualGameState>();
    const [loading, setLoading] = useState<boolean>(false);

    const searchParams = useSearchParams();

    const { } = useRequest(async () => {
        try {
            setLoading(true);
            const init = searchParams.get("init") as string;
            const initPromt: Promt = {
                userChat: init
            }
            const response = await axiosClient.post<IBaseModel<VirtualGameState>>(POST_SIMULATION_VIRTUAL_API, initPromt)
            setGameState(response.data.responseRequest);
            setLoading(false);
        } catch {
            setLoading(false);
        }
    })

    const { run } = useRequest(async (action: string) => {

        try {
            const promt: Promt = {
                userChat: action
            }
            const response = await axiosClient.post<IBaseModel<VirtualGameState>>(POST_SIMULATION_VIRTUAL_API, promt)
            setGameState(response.data.responseRequest);
            setUserAction("");
        } catch {
        }
    }, {
        manual: true
    })

    const handleActionSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would send the action to a game engine
        // and update the gameState with the response
        run(userAction)
    };

    const handleSuggestedAction = (action: string) => {
        // In a real app, this would process the suggested action
        setUserAction(action);
        run(action)
    };

    return (
        <>
            {
                !loading ?
                    gameState ? (
                        <div className="flex flex-col min-h-screen">
                            {/* Header */}
                            <header className="bg-green-600 p-4 rounded-lg text-white">
                                <div className="container mx-auto flex items-center">
                                    <div className="w-12 h-12 bg-white bg-opacity-30 rounded-full flex mr-3">
                                    </div>
                                    <h1 className="text-3xl font-bold">Giả lập tình huống</h1>
                                </div>
                            </header>

                            {/* Main content */}
                            <div className="flex-grow flex text-start">
                                {/* Left column */}
                                <div className="w-3/4 bg-white p-4 border-r items-start border-green-300">
                                    {/* Situation */}
                                    <section className="mb-6">
                                        <h2 className="text-2xl text-green-600 font-semibold mb-2">Tình Huống</h2>
                                        <p className="text-gray-700 text-start">{gameState.situation.description}</p>
                                    </section>

                                    {/* Environment */}
                                    <section className="mb-6 text-start">
                                        <h2 className="text-2xl text-green-600 font-semibold mb-2">Môi Trường</h2>
                                        <ul className="list-disc list-inside text-gray-700">
                                            <li><span className="font-medium">Địa hình:</span> {gameState.situation.environment.terrain}</li>
                                            <li><span className="font-medium">Thời tiết:</span> {gameState.situation.environment.weather}</li>
                                            <li><span className="font-medium">Thời gian:</span> {gameState.situation.environment.time}</li>
                                            <li><span className="font-medium">Tài nguyên:</span> {gameState.situation.environment.resources}</li>
                                            <li><span className="font-medium">Nơi trú:</span> lùm cây rậm rạp với khoảng trống nhỏ phía sau</li>
                                        </ul>
                                    </section>

                                    {/* Character */}
                                    <section className="mb-6 text-start">
                                        <h2 className="text-2xl text-green-600 font-semibold mb-2">Thông Tin Nhân Vật</h2>
                                        <div className="text-gray-700">
                                            <p><span className="font-medium">Trang phục:</span> {gameState.situation.character.equipment}</p>
                                            <p><span className="font-medium">Đồ đạc:</span> {gameState.situation.character.items ? gameState.situation.character.items.join(", ") : ""}</p>
                                            <p><span className="font-medium">Sức khỏe:</span> {gameState.situation.character.health_status}</p>
                                            <p><span className="font-medium">Kỹ năng:</span> {gameState.situation.character.skills}</p>
                                        </div>
                                    </section>

                                    {/* Advantages, Disadvantages and Risks */}
                                    <section className="mb-6 bg-green-50 p-4 rounded text-start">
                                        <p className="text-red-700 mb-2"><span className="font-semibold">Nguy hiểm:</span> {gameState.situation.danger.threat}</p>
                                        <p className="text-blue-700 mb-2"><span className="font-semibold">Mức độ:</span> {gameState.situation.danger.level}</p>
                                        <p className="text-yellow-700"><span className="font-semibold">Rủi ro:</span> {gameState.situation.danger.unexpected_events}</p>
                                    </section>

                                    <p className="text-gray-700 font-medium text-start">{gameState.next_prompt}</p>

                                    {/* Suggested Actions */}
                                    <div className="mt-4 grid grid-cols-1 gap-2">
                                        {gameState.suggested_actions.map((action, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleSuggestedAction(action.option)}
                                                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded text-left"
                                            >
                                                {action.option}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Action input */}
                                    <form onSubmit={handleActionSubmit} className="mt-4 flex">
                                        <input
                                            type="text"
                                            value={userAction}
                                            onChange={(e) => setUserAction(e.target.value)}
                                            placeholder="Nhập hành động của bạn..."
                                            className="flex-grow border border-gray-300 p-2 rounded-l"
                                        />
                                        <button
                                            type="submit"
                                            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-r"
                                        >
                                            Thực hiện
                                        </button>
                                    </form>
                                </div>

                                {/* Right column - Stats */}
                                <div className="w-1/4 bg-white p-4">
                                    <h2 className="text-2xl text-green-600 font-semibold mb-4">Cập Nhật Chỉ Số</h2>
                                    <div className="space-y-4">
                                        <StatProgressBar label="Sức khỏe" value={gameState.action_feedback.stats_update.health.value} />
                                        <StatProgressBar label="Đói" value={gameState.action_feedback.stats_update.hunger.value} />
                                        <StatProgressBar label="Khát" value={gameState.action_feedback.stats_update.thirst.value} />
                                        <StatProgressBar label="Tinh thần" value={gameState.action_feedback.stats_update.spirit.value} />
                                        <StatProgressBar label="Nhiệt độ cơ thể" value={gameState.action_feedback.stats_update.body_temperature.value} max={40} />
                                        <StatProgressBar label="Mệt mỏi" value={gameState.action_feedback.stats_update.fatigue.value} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <></>
                    ) : (
                        <div className='h-full flex items-center justify-center'>
                            <Spinner></Spinner>
                        </div>
                    )
            }
        </>
    );
}

export default Page;