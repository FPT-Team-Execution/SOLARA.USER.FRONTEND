import React, { ReactElement } from 'react';
import './SpecialFeatures.css';
import VectorSpecialFeaturesBg from './VectorSpecialFeaturesBg';
import Vector2Title from './Vector2Title';
import Link from 'next/link';
import { HOME_ROUTE, LEARNING_SIMULATIONS_ROUTE, LEARNING_TOPICS_ROUTE, MARKET_ROUTE } from '@/constants/routes';

interface IProps {
  icon: ReactElement,
  title: string,
  description: string,
  link: string
}

const FeatureCard = ({ icon, title, description, link }: IProps) => (
  <div className="bg-[#296630] p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center pad">
    <div className="bg-[#FFCD0A] p-2 sm:p-3 rounded-lg mb-3 sm:mb-4" style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Link legacyBehavior href={link}>
        <a className="!text-inherit flex items-center justify-center">
          {React.cloneElement(icon, {
            className: "w-12 h-12 sm:w-16 sm:h-16"
          })}
        </a>
      </Link>
    </div>
    <h3 className="title text-emerald-50 font-semibold mb-2 text-base sm:text-lg">{title}</h3>
    <p className="text-emerald-100 text-xs sm:text-sm">{description}</p>
  </div>
);

const FeatureGrid = () => {
  const features = [
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      ),
      title: "Flashcard Tương Tác",
      description: "Học tập hiệu quả",
      link: LEARNING_TOPICS_ROUTE
    },
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      ),
      title: "Giả Lập Thực Tế",
      description: "Trải nghiệm hấp dẫn",
      link: LEARNING_SIMULATIONS_ROUTE
    },
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      title: "Lời Khuyên & Hướng Dẫn",
      description: "Thư viện kiến nghiệm",
      link: HOME_ROUTE
    },
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Chợ Dụng Cụ Sinh Tồn",
      description: "Mua sắm hiệu quả",
      link: MARKET_ROUTE
    }
  ];

  return (
    <div id='SpecialFeatures' className="bg-[#F7F8F7] py-12 sm:py-16 md:py-20 px-4 relative overflow-hidden">
      <div className="relative z-10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="tinh-nang-dac-biet text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              Tính Năng Đặc Biệt <Vector2Title className="vector2-margin2 inline-block ml-2 w-12 sm:w-14 md:w-16" />
            </h1>
            <p className="hoc-ky-nang-sinh-ton text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Học kỹ năng sinh tồn cho mọi tình huống
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                link={feature.link}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Background Vector (Optional) */}
      <div className="absolute inset-0 pointer-events-none">
        <VectorSpecialFeaturesBg />
      </div>
    </div>
  );
};

export default FeatureGrid;