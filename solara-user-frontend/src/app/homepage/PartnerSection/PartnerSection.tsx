"use client";
import React from 'react';
import Image from 'next/image';
import './PartnerSection.css'
import CustomButton from '../Button/CustomButton';
import Link from 'next/link';
import Vector2Title from '../SpecialFeatures/Vector2Title';
import VectorSpecialFeaturesBg from '../SpecialFeatures/VectorSpecialFeaturesBg';

const PartnerSection = () => {
  const partners = [
    { id: 1, name: 'Tổ Ong Adventure', logo: '/sm-logo.png' },
    { id: 2, name: 'Đi Outdoor', logo: '/sm-logo.png' },
    { id: 3, name: 'Fami Adventure', logo: '/sm-logo.png' },
    // { id: 4, name: 'Decathlon', logo: '/sm-logo.png' },
    // { id: 5, name: 'SUP Team', logo: '/sm-logo.png' },
    // { id: 6, name: 'UMOVE Travel', logo: '/sm-logo.png' },
  ];

  return (
    <section className="bg-gray-50 py-16 px-4 md:px-8 mx-custom">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12 ">
        {/* Left Section: Information */}
        <div className="md:w-1/2 text-center md:text-left">
            <div className="partner-title"><Vector2Title className="vector2-margin" />Đối Tác & Nhà Bán Hàng</div>
            <p className="text-partner">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <Link href="/partnerInfo">
                <CustomButton style={{ minWidth: '210px'}} className="custom-button text-white hover:bg-green-600"><p className='text-white'>Tìm hiểu thêm</p></CustomButton>
            </Link>
        </div>

        {/* Right Section: Partner Logos */}
        <div className="md:w-1/2 flex flex-wrap justify-center md:justify-start items-center gap-6">
          {partners.map((partner) => (
            <div key={partner.id} className="w-32 md:w-40">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={160}
                height={60}
                className="object-contain mx-auto"
              />
            </div>
          ))}
          <VectorSpecialFeaturesBg className = "vectorBg"/>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
