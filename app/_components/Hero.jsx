import React from "react";
import Carousel from "@/components/ui/Carousel";

function Hero() {
  return (
    <section className="bg-gray-50 flex flex-col items-center text-center p-10">
      <h1 className="text-4xl font-semibold text-black">
        Finance made simple for women by women <br />
        <span className="text-4xl md:text-[6rem] text-blue-800 font-bold mt-1 leading-none">
          Finance Advisor
        </span>
      </h1>

   
  
      <div className="mt-6 w-full max-w-3xl">
        <Carousel />
      </div>
    </section>
  );
}

export default Hero;
