"use client";

import React from "react";
import { Card, CardBody, Button } from "@nextui-org/react";

const NewsUpdates = () => {
  const news = [
    { title: "New Nomination Category Announced", date: "May 15, 2023" },
    { title: "KNOMS Celebrates 5 Years of Excellence", date: "June 1, 2023" },
    { title: "Nomination Deadline Extended", date: "June 10, 2023" },
  ];

  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">News & Updates</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {news.map((item, index) => (
          <Card key={index} className="bg-white shadow-lg">
            <CardBody>
              <p className="text-gray-500 mb-2">{item.date}</p>
              <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
              <Button color="primary" className="bg-[#8B0000]">
                Read More
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NewsUpdates;
