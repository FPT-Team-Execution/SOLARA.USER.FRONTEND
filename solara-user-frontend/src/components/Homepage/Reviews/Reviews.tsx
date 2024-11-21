"use client";
import React, { useState } from "react";
import Image from "next/image";
import "./Reviews.css"; // You'll likely need this for custom styling if any

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

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="bg-white w-full px-4 py-8 sm:py-12 md:py-16 lg:max-w-7xl lg:mx-auto"> {/* Increased max-width for better layout */}
      <div className="bg-white relative"> {/* Container for testimonial and navigation */}
        {/* Navigation Buttons */}
        <div className="flex z-10 justify-between absolute top-1/2 -translate-y-1/2 w-full px-4 md:px-8 lg:px-12"> {/* Improved button container */}
          <button
            onClick={prevSlide}
            className="bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-100 focus:outline-none transition-colors duration-300"
            aria-label="Previous testimonial"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-100 focus:outline-none transition-colors duration-300"
            aria-label="Next testimonial"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>


        {/* Testimonial Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-5xl mx-auto mt-8"> {/* Added margin top */}
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="relative w-full md:w-1/2 h-[300px] md:h-[400px] lg:h-[480px] overflow-hidden">
              <Image
                src={testimonials[currentSlide].image}
                alt={`Image for ${testimonials[currentSlide].name}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
                quality={90}
                priority
              />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 bg-[#FFF9EA] flex flex-col justify-center relative">
              {/* Rating */}
              <div className="flex gap-1 mb-4 sm:mb-6 justify-center">
                {Array.from({ length: testimonials[currentSlide].rating }).map(
                  (_, index) => (
                    <svg
                      key={index}
                      className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  )
                )}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-center mb-4"> {/* Added margin bottom */}
                <p className="text-sm sm:text-base md:text-lg italic">
                  {testimonials[currentSlide].content}
                </p>
              </blockquote>

              {/* User Info */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden relative flex-shrink-0">
                  <Image
                    src={testimonials[currentSlide].avatar}
                    alt={`Avatar of ${testimonials[currentSlide].name}`}
                    fill
                    sizes="(max-width: 640px) 40px, 48px"
                    className="object-cover"
                  />
                </div>
                <p className="font-medium text-gray-800 text-sm sm:text-base">
                  {testimonials[currentSlide].name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-4 sm:mt-6 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-yellow-400 w-4" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;