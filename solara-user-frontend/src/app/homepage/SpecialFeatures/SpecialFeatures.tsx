import React from 'react';
import './SpecialFeatures.css';
import VectorSpecialFeaturesBg from './VectorSpecialFeaturesBg';
import Vector2Title from './Vector2Title'
import Link from 'next/link';

const FeatureCard = ({ icon, title, description,link }) => (
  <div className="bg-[#296630] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
    <div className="bg-[#FFCD0A] p-3 rounded-lg mb-4" style={{ width: 99, height: 97 }}>
      <Link className="!text-inherit" href={link}>{icon}</Link>
    </div>
    <h3 className="title text-emerald-50 font-semibold mb-2">{title}</h3>
    <p className="text-emerald-100 text-sm">{description}</p>
  </div>
);

const FeatureGrid = () => {
  const features = [
    {
      icon: (
        <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      ),
      title: "Flashcard Tương Tác",
      description: "Học tập hiệu quả",
      link: "/learning"
    },
    {
      icon: (
        <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      ),
      title: "Giả Lập Thực Tế",
      description: "Trải nghiệm hấp dẫn",
      link: "/simulation"
    },
    {
      icon: (
        <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      title: "Lời Khuyên & Hướng Dẫn",
      description: "Thư viện kiến nghiệm",
      link:"/"
    },
    {
      icon: (
        <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Chợ Dụng Cụ Sinh Tồn",
      description: "Mua sắm hiệu quả",
      link: "/products"
    }
  ];

  return (
    <div className="bg-[#F7F8F7] custom-py px-4 stage-2 relative">
      <div className="relative">
        <VectorSpecialFeaturesBg/>
        <div className="max-wx mx-features absolute top-0 left-0 right-0 z-10">
          <div className="text-center mb-12">
            <h1 className="tinh-nang-dac-biet text-5xl font-bold mb-4">Tính Năng Đặc Biệt <Vector2Title className="vector2-margin inline-block" /></h1>
            
            <p className="hoc-ky-nang-sinh-ton text-lg text-gray-600">Học kỹ năng sinh tồn cho mọi tình huống</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                link = {feature.link}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureGrid;