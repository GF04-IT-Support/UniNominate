"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  return (
    <div className="bg-[#8B0000] text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          KNUST Nomination System
        </h1>
        <p className="text-xl mb-8">Nominate for School Leadership Positions</p>
        <Button
          color="default"
          endContent={<FaArrowRight />}
          size="lg"
          className="hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer bg-white text-[#8B0000] font-bold"
          onClick={() => router.push("/nominations")}
        >
          View Open Positions
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
