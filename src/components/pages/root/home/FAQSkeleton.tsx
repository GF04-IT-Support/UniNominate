import React from 'react';
import { Card, CardBody, Skeleton } from "@nextui-org/react";

const FAQSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <Skeleton className="w-3/4 h-8 mb-8 mx-auto rounded-lg"/>
      {[1, 2, 3].map((i) => (
        <React.Fragment key={i}>
          <>
            <Skeleton className="w-3/4 h-6 mb-2 rounded-lg"/>
            <Skeleton className="w-full h-4 mb-1 rounded-lg"/>
            <Skeleton className="w-full h-4 mb-1 rounded-lg"/>
            <Skeleton className="w-3/4 h-4 rounded-lg"/>
          </>
        </React.Fragment>
      ))}
    </div>
  );
};

export default FAQSkeleton;