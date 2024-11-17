"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import './Reviews.css'

const TestimonialSlider = () => {
  const testimonials = [
    {
      id: 1,
      content: "Các bài học trên Solara thực sự rất thú vị và bổ ích!",
      name: "Nguyễn Thành Đạt",
      avatar: "/avatar.png",
      image: "/placeholder.png",
      rating: 5,
    },
    {
      id: 2,
      content: "Nhờ việc học flashCard trên Solara đã cứu tôi một mạng khỏi việc đuối nước huhu!",
      name: "Nguyễn Xuân Đạt",
      avatar: "/avatar.png",
      image: "/placeholder.png",
      rating: 5,
    },
    // Add more testimonials as needed
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % testimonials.length);

  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative max-w-6xl mx-auto px-4 py-16">
      {/* Navigation Buttons */}
      {['left', 'right'].map((direction, idx) => (
        <button
          key={direction}
          onClick={direction === 'left' ? prevSlide : nextSlide}
          className={`absolute ${direction === 'left' ? 'left-2 left-arrow' : 'right-2 right-arrow'} top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors`}
          aria-label={`${direction === 'left' ? 'Previous' : 'Next'} testimonial`}
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={direction === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
            />
          </svg>
        </button>
      ))}

      {/* Testimonial Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row md:h-[480px]">
          {/* Image Section */}
          <div className="relative w-full md:w-1/2 h-[300px] md:h-full overflow-hidden">
            <Image
              src={testimonials[currentSlide].image}
              alt={`Image for ${testimonials[currentSlide].name}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
              quality={100}
              priority
            />
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 p-6 md:p-8 lg:p-12 bg-[#FFF9EA] flex flex-col justify-center">
            {/* Rating */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: testimonials[currentSlide].rating }).map((_, index) => (
                <svg
                  key={index}
                  className="w-10 h-10 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Testimonial Text */}
            <blockquote className="relative">
                <p className="reviews">{testimonials[currentSlide].content}</p>
            </blockquote>

            {/* User Info */}
            <div className="flex items-center gap-4 mt-auto">
                
              <div className="w-12 h-12 rounded-full overflow-hidden relative flex-shrink-0">
                <Image
                  src={testimonials[currentSlide].avatar}
                  alt={`Avatar of ${testimonials[currentSlide].name}`}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <p className="font-medium text-gray-800">{testimonials[currentSlide].name}</p>
              <div className="custom-icon-du">
                    <svg width="36" height="27" viewBox="0 0 36 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="&#240;&#159;&#166;&#134; icon &#34;double quote serif right&#34;">
                        <path id="Vector" d="M0.5 6.61331C0.5 3.23702 3.23702 0.5 6.61331 0.5C9.9896 0.5 12.7266 3.23702 12.7266 6.61331V13.2266C12.7266 19.505 8.11569 24.7632 2.11173 25.7768C1.27345 25.9183 0.5 25.2177 0.5 24.2488C0.5 23.3291 1.27202 22.5205 2.30478 22.2605C4.84921 21.6198 6.96684 19.9417 8.18825 17.6963C8.88117 16.4225 8.60198 15.1426 7.80833 14.2149C7.03038 13.3055 5.76161 12.7266 4.40887 12.7266C2.25006 12.7266 0.5 10.9766 0.5 8.81775V6.61331ZM22.5444 6.61331C22.5444 3.23702 25.2814 0.5 28.6577 0.5C32.034 0.5 34.771 3.23702 34.771 6.61331V13.2266C34.771 19.505 30.1601 24.7632 24.1561 25.7768C23.3178 25.9183 22.5444 25.2177 22.5444 24.2488C22.5444 23.3291 23.3164 22.5205 24.3491 22.2605C26.8936 21.6198 29.0112 19.9417 30.2326 17.6963C30.9255 16.4225 30.6464 15.1426 29.8527 14.2149C29.0747 13.3055 27.806 12.7266 26.4532 12.7266C24.2944 12.7266 22.5444 10.9766 22.5444 8.81775V6.61331Z" stroke="#F9BF00"/>
                        </g>
                    </svg>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 rounded-full ${currentSlide === index ? 'bg-yellow-400' : 'bg-gray-300'} transition-all`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;