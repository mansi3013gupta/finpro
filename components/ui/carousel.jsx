"use client";
import React, { useState } from "react";

const images = [
  "finance1.jpg",
  "finance2.jpg",
  "finance3.jpg",
].map((img) => process.env.PUBLIC_URL + img);

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto mt-10">
      <div className="overflow-hidden rounded-lg">
        <img
          src={images[current]}
          alt={`Slide ${current}`}
          className="w-full h-64 object-cover transition-transform duration-500"
        />
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
      >
        ⬅
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
      >
        ➡
      </button>
    </div>
  );
};

export default Carousel;
