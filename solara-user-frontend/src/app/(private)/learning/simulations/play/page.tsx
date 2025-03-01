"use client"

import StatProgressBar from '@/components/ui/StatProgressBar';
import { mockGameState, VirtualGameState } from '@/types/simulation';
import React, { useEffect, useState } from 'react'

const Page = () => {

    const [userAction, setUserAction] = useState("");
    const [gameState, setGameState] = useState<VirtualGameState>(mockGameState);

    useEffect(() => {
        setGameState(mockGameState);
    }, [])

    const handleActionSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would send the action to a game engine
        // and update the gameState with the response
        setUserAction("");
    };

    const handleSuggestedAction = (action: string) => {
        // In a real app, this would process the suggested action
        console.log("Selected action:", action);
    };

    return (
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
                            <p><span className="font-medium">Đồ đạc:</span> {gameState.situation.character.items.join(", ")}</p>
                            <p><span className="font-medium">Sức khỏe:</span> {gameState.situation.character.healthStatus}</p>
                            <p><span className="font-medium">Kỹ năng:</span> {gameState.situation.character.skills}</p>
                        </div>
                    </section>

                    {/* Advantages, Disadvantages and Risks */}
                    <section className="mb-6 bg-green-50 p-4 rounded text-start">
                        <p className="text-green-700 mb-2"><span className="font-semibold">Ưu điểm:</span> Tìm kiếm nơi trú ẩn là một hành động hợp lý để bảo vệ bản thân khỏi thời tiết khắc nghiệt.</p>
                        <p className="text-yellow-700 mb-2"><span className="font-semibold">Nhược điểm:</span> Lùm cây có thể không an toàn, có thể chứa côn trùng, rắn rết hoặc thậm chí động vật hoang dã. Việc lựa chọn nơi trú ẩn cần cẩn trọng.</p>
                        <p className="text-red-700 mb-2"><span className="font-semibold">Rủi ro:</span> Bị côn trùng cắn, rắn rết tấn công, hoặc bị động vật hoang dã phát hiện.</p>
                        <p className="text-blue-700"><span className="font-semibold">Kiến thức:</span> Việc tìm kiếm nơi trú ẩn trong tự nhiên cần chú ý đến các yếu tố an toàn như: tránh các khu vực ẩm ướt, có mùi lạ, hoặc có dấu hiệu của động vật.</p>
                    </section>

                    <p className="text-gray-700 font-medium text-start">{gameState.nextPrompt}</p>

                    {/* Suggested Actions */}
                    <div className="mt-4 grid grid-cols-1 gap-2">
                        {gameState.suggestedActions.map((action, index) => (
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
                        <StatProgressBar label="Sức khỏe" value={gameState.actionFeedback.statsUpdate.health.value} />
                        <StatProgressBar label="Đói" value={gameState.actionFeedback.statsUpdate.hunger.value} />
                        <StatProgressBar label="Khát" value={gameState.actionFeedback.statsUpdate.thirst.value} />
                        <StatProgressBar label="Tinh thần" value={gameState.actionFeedback.statsUpdate.spirit.value} />
                        <StatProgressBar label="Nhiệt độ cơ thể" value={gameState.actionFeedback.statsUpdate.bodyTemperature.value} max={40} />
                        <StatProgressBar label="Mệt mỏi" value={gameState.actionFeedback.statsUpdate.fatigue.value} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;