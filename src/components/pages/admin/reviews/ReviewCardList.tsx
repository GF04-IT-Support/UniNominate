import React from "react";
import ReviewCard from "./ReviewCard";

interface ReviewCardListProps {
  nominations: any[];
}

const ReviewCardList: React.FC<ReviewCardListProps> = ({ nominations }) => {
  return (
    <div className="flex flex-col gap-4 flex-wrap">
      {nominations.map((nomination) => (
        <ReviewCard key={nomination.id} nomination={nomination} />
      ))}
    </div>
  );
};

export default ReviewCardList;
