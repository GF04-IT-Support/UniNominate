import React from "react";
import FAQSection from "@/components/pages/root/home/FAQSection";

export default function FAQPage() {
  return (
    <div>
      <div className="bg-[#8B0000] text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-center">
            Find answers to common questions about the KNUST Nomination System
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <p className="text-lg mb-8">
          We've compiled a list of frequently asked questions to help you
          navigate the nomination process. If you can't find the answer you're
          looking for, please don't hesitate to contact our support team.
        </p>

        <FAQSection />
      </div>
    </div>
  );
}
