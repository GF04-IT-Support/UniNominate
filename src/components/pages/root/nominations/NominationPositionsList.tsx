"use client";

import React, { useState } from "react";
import { Card, CardBody, CardFooter, Button, Input } from "@nextui-org/react";
import { FaTrophy, FaSearch } from "react-icons/fa";
import RequestFormModal from "./RequestFormModal";

interface NominationPosition {
  id: number;
  title: string;
  description: string;
}

interface NominationPositionsListProps {
  positions: NominationPosition[];
}

const NominationPositionsList: React.FC<NominationPositionsListProps> = ({
  positions,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] =
    useState<NominationPosition | null>(null);

  const filteredPositions = positions.filter(
    (position) =>
      position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      position.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRequestForm = (position: NominationPosition) => {
    setSelectedPosition(position);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-center">
        <Input
          startContent={<FaSearch className="text-[#8B0000]" />}
          placeholder="Search positions..."
          className="max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          radius="full"
        />
      </div>

      {filteredPositions.length === 0 ? (
        <div className="text-center text-gray-600 font-bold flex items-center justify-center h-[200px]">
          No open nomination positions available.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPositions.map((position) => (
            <Card key={position.id} className="bg-white shadow-lg">
              <CardBody>
                <FaTrophy className="text-4xl text-[#8B0000] mb-4" />
                <h3 className="text-xl font-semibold mb-2">{position.title}</h3>
                <p className="text-gray-600">{position.description}</p>
              </CardBody>
              <CardFooter>
                <Button
                  color="primary"
                  className="bg-[#8B0000] text-white"
                  onClick={() => handleRequestForm(position)}
                >
                  Request Form
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {isModalOpen && (
        <RequestFormModal
          isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
          position={selectedPosition}
        />
      )}
    </>
  );
};

export default NominationPositionsList;
