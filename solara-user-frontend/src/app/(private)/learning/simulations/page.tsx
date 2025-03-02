"use client"

import { LEARNING_SIMULATIONS_PLAY_ROUTE } from '@/constants/routes';
import { SimulationShow } from '@/types/simulation';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const StreamingServiceWithPopup = () => {
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedShow, setSelectedShow] = useState<SimulationShow>();
  const router = useRouter();

  const navigatePlay = (init: string) => {
    router.push(LEARNING_SIMULATIONS_PLAY_ROUTE + `?init=${encodeURIComponent(init)}`)
  }

  const trending: SimulationShow[] = [
    {
      id: 1,
      title: 'Sông nước sinh tồn',
      image: 'https://psszjkdspnyifyjbmyau.supabase.co/storage/v1/object/public/Topics/73796af1-c457-4ceb-af14-eefdb34144d8-images.jpg',
      year: '2025',
      rating: 'T16',
      genre: 'Sinh tồn',
      category: 'Phiêu lưu',
      mood: 'Căng thẳng',
      type: 'Chương trình thực tế',
      description: 'Một nhóm người chơi bị mắc kẹt giữa vùng sông nước hoang sơ, phải học cách tìm kiếm thức ăn, nước uống và dựng nơi trú ẩn để sống sót qua 30 ngày thử thách.'
    },
    {
      id: 2,
      title: 'Hỏa hoạn sinh tử',
      image: 'https://psszjkdspnyifyjbmyau.supabase.co/storage/v1/object/public/Topics/d48ea42a-6c70-4908-9792-378760e232e5-images.jpg',
      year: '2025',
      rating: 'T18',
      genre: 'Hành động',
      category: 'Kịch tính',
      mood: 'Hồi hộp',
      type: 'Phim tài liệu',
      description: 'Bộ phim tái hiện những tình huống sinh tồn khắc nghiệt khi mắc kẹt trong đám cháy lớn, hướng dẫn cách giữ bình tĩnh, tìm đường thoát hiểm và sinh tồn trong môi trường ngột ngạt.'
    },
    {
      id: 3,
      title: 'Thất lạc trong rừng',
      image: 'https://psszjkdspnyifyjbmyau.supabase.co/storage/v1/object/public/Topics/db77d51d-2c07-41a6-b94d-4efe8b1ed286-Bilactrongrung.jpg',
      year: '2025',
      rating: 'T16',
      genre: 'Phiêu lưu',
      category: 'Sinh tồn',
      mood: 'Hồi hộp',
      type: 'Chương trình thực tế',
      description: 'Người chơi bị bỏ lại giữa khu rừng rậm nhiệt đới mà không có bất kỳ công cụ nào, phải dựa vào trí thông minh và bản năng sinh tồn để tồn tại trong điều kiện khắc nghiệt.'
    },
    {
      id: 4,
      title: 'Sống sót sau tai nạn máy bay',
      image: 'https://psszjkdspnyifyjbmyau.supabase.co/storage/v1/object/public/Topics/5c0f3353-1e07-4a38-9301-1e4fb7618944-Cac-may-bay-thuong-mai.webp',
      year: '2025',
      rating: 'T18',
      genre: 'Giả lập sinh tồn',
      category: 'Kịch tính',
      mood: 'Căng thẳng',
      type: 'Phim tài liệu',
      description: 'Bộ phim dựa trên những vụ tai nạn máy bay có thật, mô phỏng các tình huống khẩn cấp và cung cấp hướng dẫn sinh tồn khi gặp sự cố trên không trung và vùng hoang dã.'
    }
  ];

  const openPopup = (title: SimulationShow) => {
    setSelectedShow(title);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col min-h-screen text-start bg-white text-gray-800">
      {/* Hero section with background image */}
      <div className="relative w-full h-64">
        <div className="absolute inset-x-0 text-center z-20 p-6">

          <h2 className="text-2xl font-bold mb-6 text-gray-800">Giả lập sinh tồn.</h2>
          <p className="mb-6 text-gray-700">Bạn đã sẵn sàng chưa? Tìm kiếm trình giả lập nào.</p>

          <div className="flex flex-col sm:flex-row justify-center gap-2 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Tên chương trình giả lập"
              className="px-4 py-3 rounded bg-white border border-gray-300 text-gray-800 flex-grow"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="px-8 py-3 bg-green-600 text-white rounded font-bold flex items-center justify-center">
              Bắt đầu
              <span className="ml-2">›</span>
            </button>
          </div>
        </div>
      </div>

      {/* Trending now section */}
      <div className="px-6 md:px-12 py-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Hiện đang thịnh hành</h2>

        <div className="relative">
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {trending.map((item) => (
              <div
                key={item.id}
                className="relative flex-shrink-0 w-64 cursor-pointer shadow-md rounded-lg overflow-hidden"
                onClick={() => openPopup(item)}
              >
                <div className="absolute left-6 top-6 text-6xl font-bold text-white opacity-70 z-10 drop-shadow-lg">
                  {item.id}
                </div>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={1000}
                  height={1000}
                  className="w-full h-64 object-cover"
                />
                <h3 className="mt-2 p-2 text-sm font-medium text-gray-800 bg-white">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup/Modal */}
      {showPopup && selectedShow && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="relative w-full max-w-2xl mx-4 bg-white rounded-lg overflow-hidden shadow-xl">
            {/* Close button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-800 text-xl z-20 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center shadow-md"
            >
              ✕
            </button>

            {/* Background image with gradient overlay */}
            <div className="relative h-96">
              <Image
                width={1000}
                height={1000}
                src={selectedShow.image}
                alt={selectedShow.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 p-6">
                <h1 className="text-3xl font-bold mb-2 text-gray-800">{selectedShow.title}</h1>

                {/* Tags */}
                {selectedShow.year && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">{selectedShow.year}</span>
                    <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">{selectedShow.rating}</span>
                    <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">{selectedShow.genre}</span>
                    <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">{selectedShow.category}</span>
                    <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">{selectedShow.mood}</span>
                    <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">{selectedShow.type}</span>
                  </div>
                )}

                {/* Description */}
                {selectedShow.description && (
                  <p className="text-sm text-gray-600 mb-6">{selectedShow.description}</p>
                )}

                {/* Watch button */}
                <button onClick={() => navigatePlay(selectedShow.title)} className="px-6 py-2 bg-green-600 text-white rounded font-bold flex items-center">
                  Bắt đầu
                  <span className="ml-2">›</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StreamingServiceWithPopup;