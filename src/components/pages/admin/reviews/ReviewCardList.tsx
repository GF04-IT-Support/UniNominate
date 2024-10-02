import React from "react";
import ReviewCard from "./ReviewCard";
import { Nomination, NominationForm } from "@prisma/client";

interface ReviewCardListProps {
  nominations: (Nomination & {
    form: NominationForm;
  })[];
}

const ReviewCardList: React.FC<ReviewCardListProps> = ({ nominations }) => {
  return (
    <div className="flex flex-row gap-4 flex-wrap">
      {nominations.map((nomination) => (
        <ReviewCard key={nomination.id} nomination={nomination} />
      ))}
    </div>
  );
};

export default ReviewCardList;
