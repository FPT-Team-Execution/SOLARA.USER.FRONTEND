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
    const [gameTime, setGameTime] = useState<string>("00:00");
    const [dayCount, setDayCount] = useState<number>(1);
    const [actionHistory, setActionHistory] = useState<string[]>([]);

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
            // Thêm mô tả tình huống vào lịch sử
            if (response.data.responseRequest?.next_prompt) {
                setActionHistory([response.data.responseRequest.next_prompt]);
            }
        } catch {
            setLoading(false);
        }
    }, {
        ready: !!searchParams.get("init")
    })

    const { run, loading: actionLoading } = useRequest(async (action: string) => {
        try {
            const promt: Promt = {
                userChat: action
            }
            const response = await axiosClient.post<IBaseModel<VirtualGameState>>(POST_SIMULATION_VIRTUAL_API, promt)
            setGameState(response.data.responseRequest);
            setUserAction("");
            
            // Thêm hành động vào lịch sử
            setActionHistory(prev => [
                ...prev, 
                `Bạn: ${action}`, 
                response.data.responseRequest?.next_prompt || ""
            ]);
            
            // Tăng thời gian trong game
            updateGameTime();
        } catch {
            // Xử lý lỗi
        }
    }, {
        manual: true
    })

    const updateGameTime = () => {
        // Giả lập thời gian game tăng mỗi khi thực hiện hành động
        const [hours, minutes] = gameTime.split(":").map(Number);
        let newHours = hours;
        let newMinutes = minutes + 30; // Mỗi hành động tăng 30 phút
        
        if (newMinutes >= 60) {
            newHours += Math.floor(newMinutes / 60);
            newMinutes = newMinutes % 60;
        }
        
        if (newHours >= 24) {
            newHours = newHours % 24;
            setDayCount(prev => prev + 1);
        }
        
        setGameTime(`${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`);
    }

    const handleActionSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userAction.trim()) {
            run(userAction);
        }
    };

    const handleSuggestedAction = (action: string) => {
        setUserAction(action);
        run(action);
    };

    const getWeatherIcon = (weather: string) => {
        if (weather?.toLowerCase().includes('mưa')) return '🌧️';
        if (weather?.toLowerCase().includes('nắng')) return '☀️';
        if (weather?.toLowerCase().includes('mây')) return '☁️';
        if (weather?.toLowerCase().includes('tuyết')) return '❄️';
        return '🌤️';
    };

    const getHealthStatusColor = (status: string) => {
        if (!status) return 'text-gray-700';
        if (status.toLowerCase().includes('tốt')) return 'text-green-600';
        if (status.toLowerCase().includes('trung bình')) return 'text-yellow-600';
        if (status.toLowerCase().includes('kém') || status.toLowerCase().includes('yếu')) return 'text-red-600';
        return 'text-gray-700';
    };

    const getDangerLevelColor = (level: string) => {
        if (!level) return 'bg-gray-100';
        if (level.toLowerCase().includes('thấp')) return 'bg-green-100 text-green-800';
        if (level.toLowerCase().includes('trung bình')) return 'bg-yellow-100 text-yellow-800';
        if (level.toLowerCase().includes('cao')) return 'bg-orange-100 text-orange-800';
        if (level.toLowerCase().includes('cực kỳ')) return 'bg-red-100 text-red-800';
        return 'bg-gray-100';
    };

    return (
        <>
            {!loading ? (
                gameState ? (
                    <div className="flex flex-col min-h-screen bg-gray-50">
                        {/* Header */}
                        <header className="bg-green-600 p-4 shadow-md">
                            <div className="container mx-auto flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-3 shadow-md">
                                        <span className="text-green-600 text-xl">🌲</span>
                                    </div>
                                    <h1 className="text-3xl font-bold text-white">SURVIVAL SIMULATOR</h1>
                                </div>
                                <div className="flex items-center space-x-4 text-white">
                                    <div className="bg-green-700 px-3 py-1 rounded-lg shadow">
                                        <span className="font-bold">🌓 Ngày {dayCount}</span>
                                    </div>
                                    <div className="bg-green-700 px-3 py-1 rounded-lg shadow">
                                        <span className="font-bold">⏱️ {gameTime}</span>
                                    </div>
                                    <div className="bg-green-700 px-3 py-1 rounded-lg shadow">
                                        <span className="font-bold">{getWeatherIcon(gameState.situation.environment.weather)} {gameState.situation.environment.weather}</span>
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* Main content */}
                        <div className="flex-grow flex text-start">
                            {/* Left column */}
                            <div className="w-3/4 bg-white p-6 border-r border-gray-200">
                                {/* Situation */}
                                <section className="mb-6 bg-green-50 p-4 rounded-lg shadow border border-green-100">
                                    <h2 className="text-2xl text-green-700 font-semibold mb-2 flex items-center">
                                        <span className="mr-2">📌</span> Tình Huống
                                    </h2>
                                    <p className="text-gray-700">{gameState.situation.description}</p>
                                </section>

                                {/* Game Log */}
                                <section className="mb-6 bg-gray-50 p-4 rounded-lg shadow border border-gray-200 h-64 overflow-y-auto">
                                    <h2 className="text-2xl text-green-700 font-semibold mb-2 flex items-center">
                                        <span className="mr-2">📜</span> Nhật Ký Sinh Tồn
                                    </h2>
                                    <div className="text-gray-700 space-y-2">
                                        {actionHistory.map((entry, index) => (
                                            <p key={index} className={`${entry.startsWith('Bạn:') ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>
                                                {entry}
                                            </p>
                                        ))}
                                    </div>
                                </section>

                                {/* Environment */}
                                <section className="mb-6 bg-blue-50 p-4 rounded-lg shadow border border-blue-100">
                                    <h2 className="text-2xl text-blue-700 font-semibold mb-2 flex items-center">
                                        <span className="mr-2">🌍</span> Môi Trường
                                    </h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                                            <p className="text-gray-700"><span className="font-medium text-blue-600">Địa hình:</span> {gameState.situation.environment.terrain}</p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                                            <p className="text-gray-700"><span className="font-medium text-blue-600">Thời tiết:</span> {gameState.situation.environment.weather}</p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                                            <p className="text-gray-700"><span className="font-medium text-blue-600">Thời gian:</span> {gameState.situation.environment.time}</p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                                            <p className="text-gray-700"><span className="font-medium text-blue-600">Tài nguyên:</span> {gameState.situation.environment.resources}</p>
                                        </div>
                                    </div>
                                </section>

                                {/* Character */}
                                <section className="mb-6 bg-yellow-50 p-4 rounded-lg shadow border border-yellow-100">
                                    <h2 className="text-2xl text-yellow-700 font-semibold mb-2 flex items-center">
                                        <span className="mr-2">👤</span> Thông Tin Nhân Vật
                                    </h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                                            <p className="text-gray-700"><span className="font-medium text-yellow-600">Trang phục:</span> {gameState.situation.character.equipment}</p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                                            <p className="text-gray-700"><span className="font-medium text-yellow-600">Sức khỏe:</span> 
                                                <span className={getHealthStatusColor(gameState.situation.character.health_status)}> {gameState.situation.character.health_status}</span>
                                            </p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                                            <p className="text-gray-700"><span className="font-medium text-yellow-600">Kỹ năng:</span> {gameState.situation.character.skills}</p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                                            <p className="text-gray-700"><span className="font-medium text-yellow-600">Đồ đạc:</span> {gameState.situation.character.items ? gameState.situation.character.items.join(", ") : "Không có"}</p>
                                        </div>
                                    </div>
                                </section>

                                {/* Dangers */}
                                <section className="mb-6 bg-red-50 p-4 rounded-lg shadow border border-red-100">
                                    <h2 className="text-2xl text-red-700 font-semibold mb-2 flex items-center">
                                        <span className="mr-2">⚠️</span> Nguy Hiểm & Rủi Ro
                                    </h2>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="bg-white p-3 rounded-lg border border-red-200 shadow-sm">
                                            <p className="text-red-700"><span className="font-semibold text-red-600">Mối đe dọa:</span> {gameState.situation.danger.threat}</p>
                                        </div>
                                        <div className={`p-3 rounded-lg border shadow-sm ${getDangerLevelColor(gameState.situation.danger.level)}`}>
                                            <p><span className="font-semibold">Mức độ:</span> {gameState.situation.danger.level}</p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg border border-yellow-200 shadow-sm">
                                            <p className="text-yellow-700"><span className="font-semibold text-yellow-600">Rủi ro:</span> {gameState.situation.danger.unexpected_events}</p>
                                        </div>
                                    </div>
                                </section>

                                <p className="text-gray-800 font-medium mb-4 bg-green-100 p-3 rounded-lg shadow border border-green-200">{gameState.next_prompt}</p>

                                {/* Suggested Actions */}
                                <div className="my-4 grid grid-cols-2 gap-3">
                                    {gameState.suggested_actions.map((action, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSuggestedAction(action.option)}
                                            disabled={actionLoading}
                                            className="bg-white hover:bg-green-100 text-green-700 py-3 px-4 rounded-lg border border-green-300 transition-colors duration-200 text-left shadow-sm hover:shadow flex items-center"
                                        >
                                            <span className="mr-2">▶️</span>
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
                                        placeholder="Nhập hành động sinh tồn của bạn..."
                                        disabled={actionLoading}
                                        className="flex-grow bg-white border border-gray-300 text-gray-700 p-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                                    />
                                    <button
                                        type="submit"
                                        disabled={actionLoading || !userAction.trim()}
                                        className={`${actionLoading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} text-white py-3 px-6 rounded-r-lg font-bold transition-colors duration-200 shadow-sm flex items-center`}
                                    >
                                        {actionLoading ? (
                                            <>
                                                <span className="mr-2">⏳</span>
                                                Đang xử lý...
                                            </>
                                        ) : (
                                            <>
                                                <span className="mr-2">▶️</span>
                                                Thực hiện
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>

                            {/* Right column - Stats */}
                            <div className="w-1/4 bg-gray-50 p-6 border-l border-gray-200">
                                <div className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-6">
                                    <h2 className="text-2xl text-green-700 font-semibold mb-4 flex items-center">
                                        <span className="mr-2">📊</span> Chỉ Số Sinh Tồn
                                    </h2>
                                    <div className="space-y-5">
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-red-600 font-medium">❤️ Sức khỏe</span>
                                                <span className="text-gray-700">{gameState.action_feedback.stats_update.health.value}%</span>
                                            </div>
                                            <StatProgressBar 
                                                label="" 
                                                value={gameState.action_feedback.stats_update.health.value} 
                                                className="bg-red-500"
                                            />
                                        </div>
                                        
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-yellow-600 font-medium">🍗 Đói</span>
                                                <span className="text-gray-700">{gameState.action_feedback.stats_update.hunger.value}%</span>
                                            </div>
                                            <StatProgressBar 
                                                label="" 
                                                value={gameState.action_feedback.stats_update.hunger.value} 
                                                className="bg-yellow-500"
                                            />
                                        </div>
                                        
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-blue-600 font-medium">💧 Khát</span>
                                                <span className="text-gray-700">{gameState.action_feedback.stats_update.thirst.value}%</span>
                                            </div>
                                            <StatProgressBar 
                                                label="" 
                                                value={gameState.action_feedback.stats_update.thirst.value} 
                                                className="bg-blue-500"
                                            />
                                        </div>
                                        
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-purple-600 font-medium">🧠 Tinh thần</span>
                                                <span className="text-gray-700">{gameState.action_feedback.stats_update.spirit.value}%</span>
                                            </div>
                                            <StatProgressBar 
                                                label="" 
                                                value={gameState.action_feedback.stats_update.spirit.value} 
                                                className="bg-purple-500"
                                            />
                                        </div>
                                        
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-orange-600 font-medium">🌡️ Nhiệt độ</span>
                                                <span className="text-gray-700">{gameState.action_feedback.stats_update.body_temperature.value}°C</span>
                                            </div>
                                            <StatProgressBar 
                                                label="" 
                                                value={gameState.action_feedback.stats_update.body_temperature.value} 
                                                max={40}
                                                className="bg-orange-500" 
                                            />
                                        </div>
                                        
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-gray-600 font-medium">😴 Mệt mỏi</span>
                                                <span className="text-gray-700">{gameState.action_feedback.stats_update.fatigue.value}%</span>
                                            </div>
                                            <StatProgressBar 
                                                label="" 
                                                value={gameState.action_feedback.stats_update.fatigue.value} 
                                                className="bg-gray-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Mini Map / Visual Clue */}
                                <div className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-6">
                                    <h2 className="text-xl text-green-700 font-semibold mb-3">🗺️ Bản Đồ Khu Vực</h2>
                                    <div className="h-48 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center">
                                        <span className="text-gray-500 text-sm">Đang khám phá...</span>
                                    </div>
                                </div>
                                
                                {/* Inventory Quick View */}
                                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                                    <h2 className="text-xl text-green-700 font-semibold mb-3">🎒 Hành Trang</h2>
                                    <div className="grid grid-cols-3 gap-2">
                                        {(gameState.situation.character.items || []).map((item, index) => (
                                            <div key={index} className="bg-gray-50 border border-gray-200 p-2 rounded-lg text-xs text-center text-gray-700 shadow-sm">
                                                {item}
                                            </div>
                                        ))}
                                        {(!gameState.situation.character.items || gameState.situation.character.items.length === 0) && (
                                            <div className="col-span-3 text-center text-gray-500 py-4">
                                                Không có vật phẩm
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )
            ) : (
                <div className='h-screen flex items-center justify-center bg-gray-100'>
                    <div className="text-center">
                        <Spinner />
                        <p className="mt-4 text-green-600">Đang tải trò chơi sinh tồn...</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default Page;