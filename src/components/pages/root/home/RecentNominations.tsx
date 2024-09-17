"use client";

import React from "react";
import { Card, CardBody, Avatar } from "@nextui-org/react";

const RecentNominations = () => {
  const nominations = [
    {
      name: "Dr. John Doe",
      category: "Outstanding Teacher Award",
      department: "Computer Science",
    },
    {
      name: "Prof. Jane Smith",
      category: "Research Innovation Prize",
      department: "Biology",
    },
    {
      name: "Dr. Alex Johnson",
      category: "Community Impact Award",
      department: "Social Sciences",
    },
  ];

  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Recent Nominations
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {nominations.map((nom, index) => (
          <Card key={index} className="bg-white shadow-lg">
            <CardBody className="flex items-center">
              <Avatar size="lg" className="mb-4" />
              <h3 className="text-xl font-semibold mb-2">{nom.name}</h3>
              <p className="text-[#8B0000] font-medium mb-1">{nom.category}</p>
              <p className="text-gray-600">{nom.department}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecentNominations;
