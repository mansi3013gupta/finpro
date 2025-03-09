"use client";
import React, { useState } from "react";
import Image from "next/image";

const images = [
  "/finance1.jpeg",
  "/finance2.jpeg",
  "/finance3.jpeg",
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-10">
      <div className="overflow-hidden rounded-lg relative h-[500px]">
        <Image
          src={images[current]}
          alt={`Slide ${current}`}
          fill
          priority
          className="object-cover transition-transform duration-500"
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
      >
        ⬅
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
      >
        ➡
      </button>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 w-2 rounded-full transition-all duration-300 
              ${current === index ? 'bg-purple-600 w-4' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
