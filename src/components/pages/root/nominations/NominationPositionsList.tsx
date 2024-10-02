"use client";

import React, { useState } from "react";
import { Card, CardBody, CardFooter, Button, Input } from "@nextui-org/react";
import { FaTrophy, FaSearch } from "react-icons/fa";
import RequestFormModal from "./RequestFormModal";
import { NominationForm } from "@prisma/client";

interface NominationPositionsListProps {
  positions: NominationForm[];
  showSearch?: boolean;
}

const NominationPositionsList: React.FC<NominationPositionsListProps> = ({
  positions,
  showSearch = true,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPositionId, setSelectedPositionId] = useState<string | null>(
    null
  );

  const filteredPositions = showSearch
    ? positions.filter(
        (position) =>
          position.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          position.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : positions;

  const handleRequestForm = (positionId: string) => {
    setSelectedPositionId(positionId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPositionId(null);
  };

  return (
    <>
      {showSearch && (
        <div className="mb-6 flex items-center justify-center">
          <Input
            startContent={<FaSearch className="text-[#8B0000]" />}
            placeholder="Search nominations..."
            className="max-w-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            radius="full"
          />
        </div>
      )}

      {filteredPositions.length === 0 ? (
        <div className="text-center text-gray-600 font-bold flex items-center justify-center h-[200px]">
          No open nomination positions available.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPositions.map((position) => (
            <Card key={position.id} className="bg-white shadow-lg">
              <CardBody className="flex flex-col justify-start items-center">
                <FaTrophy className="text-4xl text-[#8B0000] mb-4" />
                <h3 className="text-xl font-semibold mb-2">{position.name}</h3>
                <p className="text-gray-600 text-center">
                  {position.description}
                </p>
              </CardBody>
              <CardFooter className="flex justify-center">
                <Button
                  color="primary"
                  className="bg-[#8B0000] text-white w-[200px]"
                  onClick={() => handleRequestForm(position.id)}
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
          onClose={handleCloseModal}
          positionId={selectedPositionId}
        />
      )}
    </>
  );
};

export default NominationPositionsList;
