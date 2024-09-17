"use client";

import React from "react";
import {
  FaClipboardList,
  FaPencilAlt,
  FaPaperPlane,
  FaMedal,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: FaClipboardList,
      title: "Choose a Position",
      description: "Select from available school leadership positions",
    },
    {
      icon: FaPencilAlt,
      title: "Request Form",
      description: "Submit a request for the nomination form",
    },
    {
      icon: FaPaperPlane,
      title: "Complete Nomination",
      description: "Fill out and submit the nomination form",
    },
    {
      icon: FaMedal,
      title: "Review Process",
      description: "Nominations are reviewed by the election committee",
    },
  ];

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Nomination Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <step.icon className="text-5xl text-[#8B0000] mb-4" />
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
