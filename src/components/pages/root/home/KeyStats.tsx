"use client";

import React from "react";
import { FaUsers, FaAward, FaUniversity } from "react-icons/fa";

const KeyStats = () => {
  const stats = [
    { icon: FaUsers, value: "1000+", label: "Students Nominated" },
    { icon: FaAward, value: "20+", label: "Leadership Positions" },
    { icon: FaUniversity, value: "6", label: "Academic Colleges" },
  ];

  return (
    <div className="bg-[#8B0000] text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Nomination Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <stat.icon className="text-5xl mb-4" />
              <p className="text-4xl font-bold mb-2">{stat.value}</p>
              <p className="text-xl">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeyStats;
