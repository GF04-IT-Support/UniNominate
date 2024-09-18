"use client";

import React from "react";
import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";
import { FaTrophy } from "react-icons/fa";

const FeaturedNominations = () => {
  const nominations = [
    {
      title: "SRC President",
      description: "Lead the Student Representative Council",
    },
    {
      title: "Hall Representative",
      description: "Represent your hall in student affairs",
    },
    {
      title: "Department Representative",
      description: "Voice for your academic department",
    },
  ];

  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Open Nominations</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {nominations.map((nom, index) => (
          <Card key={index} className="bg-white shadow-lg">
            <CardBody className="flex flex-col justify-center items-center">
              <FaTrophy className="text-4xl text-[#8B0000] mb-4" />
              <h3 className="text-xl font-semibold mb-2">{nom.title}</h3>
              <p className="text-gray-600 text-center">{nom.description}</p>
            </CardBody>
            <CardFooter className="flex justify-center">
              <Button color="primary" className="bg-[#8B0000] w-[200px]">
                Request Form
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedNominations;
