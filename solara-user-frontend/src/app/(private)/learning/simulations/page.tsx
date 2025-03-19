"use client"

import { LEARNING_SIMULATIONS_PLAY_ROUTE } from '@/constants/routes';
import { SimulationShow } from '@/types/simulation';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const StreamingServiceWithPopup = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedShow, setSelectedShow] = useState<SimulationShow | null>(null);
  const router = useRouter();

  const navigatePlay = (title: string) => {
    router.push(`${LEARNING_SIMULATIONS_PLAY_ROUTE}?init=${encodeURIComponent(title)}`);
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

  const showDetails = (show: SimulationShow) => {
    setSelectedShow(show);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // Prevent scrolling when modal is open
  React.useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showPopup]);

  const ShowCard = ({ show }: { show: SimulationShow }) => (
    <div
      className="relative flex-shrink-0 w-64 cursor-pointer shadow-md rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      onClick={() => showDetails(show)}
    >
      <div className="absolute left-4 top-4 z-10 bg-black/50 text-white text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full">
        {show.id}
      </div>
      <div className="relative h-40 overflow-hidden">
        <Image
          width={1000}
          height={1000}
          src={show.image}
          alt={show.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>
      </div>
      <div className="p-3 bg-white">
        <h3 className="font-medium text-gray-800 line-clamp-1">{show.title}</h3>
        <div className="flex mt-1 gap-1">
          <span className="text-xs px-1.5 bg-gray-100 text-gray-600 rounded">{show.genre}</span>
          <span className="text-xs px-1.5 bg-gray-100 text-gray-600 rounded">{show.rating}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen text-start bg-gray-50 text-gray-800">
      {/* Hero section with enhanced design */}
      <div className="relative w-full bg-gradient-to-r from-green-50 to-blue-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center z-20 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Giả lập sinh tồn</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">Bạn đã sẵn sàng đối mặt với những thử thách sinh tồn chưa? Tìm kiếm trình giả lập ngay.</p>

          <div className="flex flex-col sm:flex-row justify-center gap-2 max-w-xl mx-auto">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Tìm kiếm chương trình giả lập..."
                className="px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-800 w-full shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold flex items-center justify-center shadow-sm transition-colors">
              Bắt đầu
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Trending now section with improved styling */}
      <div className="px-4 md:px-8 lg:px-12 py-12 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Hiện đang thịnh hành</h2>
          <button className="text-green-600 hover:text-green-700 font-medium flex items-center">
            Xem tất cả
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trending.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Modal with better animations and structure */}
      {showPopup && selectedShow && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div
            className="relative w-full max-w-3xl bg-white rounded-xl overflow-hidden shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-white z-20 bg-black/30 hover:bg-black/50 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Background image with gradient overlay */}
            <div className="relative h-80 sm:h-96">
              <Image
                width={1000}
                height={1000}
                src={selectedShow.image}
                alt={selectedShow.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            </div>

            {/* Content area */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-3xl font-bold mb-2">{selectedShow.title}</h1>

              {/* Tags with improved styling */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs">{selectedShow.year}</span>
                <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs">{selectedShow.rating}</span>
                <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs">{selectedShow.genre}</span>
                <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs">{selectedShow.category}</span>
                <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs">{selectedShow.mood}</span>
                <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs">{selectedShow.type}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-200 mb-6 max-w-2xl">{selectedShow.description}</p>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigatePlay(selectedShow.title)}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold flex items-center transition-colors"
                >
                  Bắt đầu ngay
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="px-6 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg font-medium flex items-center transition-colors">
                  Chi tiết
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add required CSS animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default StreamingServiceWithPopup;