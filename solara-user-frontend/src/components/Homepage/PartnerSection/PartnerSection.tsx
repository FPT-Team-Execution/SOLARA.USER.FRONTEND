"use client";
import React from "react";
import Image from "next/image";
import CustomButton from "../Button/CustomButton";
import Link from "next/link";
import Vector2Title from "../SpecialFeatures/Vector2Title";
// import VectorSpecialFeaturesBg from "../SpecialFeatures/VectorSpecialFeaturesBg"
import "./PartnerSection.css"

const PartnerSection = () => {
  const partners = [
    { id: 1, name: "Tổ Ong Adventure", logo: "/sm-logo.png" },
    { id: 2, name: "Đi Outdoor", logo: "/sm-logo.png" },
    { id: 3, name: "Fami Adventure", logo: "/sm-logo.png" },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 py-12 bg-[#F7F8F7] min-h-[500px]">
      {/* Left Section: Information */}
      <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col justify-center">
        <div className="flex items-center justify-center mb-4 relative">
          <Vector2Title className="vector2-margin inline-block ml-2 w-12 sm:w-14 md:w-16" />
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1C3A1F] leading-snug">
            Đối Tác & Nhà Bán Hàng
          </h1>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-partner text-sm md:text-base lg:text-lg leading-relaxed italic text-[#1C3A1F]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <Link href="/partners" legacyBehavior>
            <a>
              <CustomButton className="custom-button px-4 py-2 md:px-6 md:py-3 mt-4 text-sm md:text-base lg:text-lg text-white">
                <p className="text-white">Tìm hiểu thêm</p>
              </CustomButton>
            </a>
          </Link>
        </div>
      </div>


      {/* Right Section: Partner Logos */}
      <div className="md:w-1/2 flex flex-wrap justify-center gap-4 flex-grow">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="w-1/3 md:w-1/4 lg:w-1/5 flex flex-col items-center"
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              width={80}
              height={80}
              className="object-contain"
            />
            <p className="text-sm mt-2 text-[#1C3A1F]">{partner.name}</p>
          </div>
        ))}
        {/* <VectorSpecialFeaturesBg className="fixed custom-vector-bg"></VectorSpecialFeaturesBg> */}
      </div>
      
      


    </div>
  );
};

export default PartnerSection;