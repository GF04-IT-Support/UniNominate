import React from "react";
import HowItWorks from "@/components/pages/root/home/HowItWorks";
import NominationPositionsList from "@/components/pages/root/nominations/NominationPositionsList";
import { getNominationPositions } from "@/services/public/nominationService";


export default async function NominationsPage() {
  const nominationPositions = await getNominationPositions();
  return (
    <div>
      <div className="bg-[#8B0000] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">
            KNUST Nominations
          </h1>
          <p className="text-xl text-center">
            Explore and apply for leadership positions within KNUST. Your
            journey to making a difference starts here.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Available Positions</h2>
          <p className="text-gray-600">
            Browse through the list of open positions and find the role where
            you can make the most impact. Use the search bar to quickly find
            specific positions.
          </p>
        </div>

        <NominationPositionsList positions={nominationPositions} />

        <HowItWorks />
      </div>
    </div>
  );
}
