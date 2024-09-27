import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Chip,
  CardHeader,
} from "@nextui-org/react";
import ReviewModal from "./ReviewModal";
import {
  Nomination,
  NominationForm,
  NominationSubmissionStatus,
} from "@prisma/client";
import { updateNominationStatus } from "@/services/admin/reviewService";

interface ReviewCardProps {
  nomination: Nomination & {
    form: NominationForm;
  };
}

const ReviewCard: React.FC<ReviewCardProps> = ({ nomination }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState(nomination.submissionStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = (newStatus: NominationSubmissionStatus) => {
    setStatus(newStatus);
  };

  const handleReviewClick = async () => {
    if (status === NominationSubmissionStatus.SUBMITTED) {
      setIsLoading(true);
      try {
        await updateNominationStatus(
          nomination.id,
          NominationSubmissionStatus.UNDER_REVIEW
        );
        setStatus(NominationSubmissionStatus.UNDER_REVIEW);
      } catch (error) {
        console.error("Error updating nomination status:", error);
      } finally {
        setIsLoading(false);
      }
    }
    setIsModalOpen(true);
  };

  const getStatusColor = () => {
    switch (status) {
      case NominationSubmissionStatus.SUBMITTED:
        return "primary";
      case NominationSubmissionStatus.UNDER_REVIEW:
        return "warning";
      case NominationSubmissionStatus.ACCEPTED:
        return "success";
      case NominationSubmissionStatus.REJECTED:
        return "danger";
      default:
        return "default";
    }
  };

  const showReviewButton = ![
    "NOT_SUBMITTED" as NominationSubmissionStatus,
    "ACCEPTED" as NominationSubmissionStatus,
    "REJECTED" as NominationSubmissionStatus,
  ].includes(status);

  return (
    <>
      <Card
        className="w-[350px] h-[300px] flex flex-col gap-4"
        isBlurred
        radius="sm"
      >
        <CardBody className="pb-0">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold">
              {nomination.nominatorName}
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            {nomination.nominatorEmail}
          </p>
          <p className="text-sm text-gray-600 mb-2 overflow-y-auto">
            {nomination.reason}
          </p>
        </CardBody>
        <CardFooter className="flex flex-col gap-4 pt-0 flex-shrink-0">
          <Chip color={getStatusColor()} className="mx-auto mt-4">
            {status}
          </Chip>
          <div className="flex justify-center">
            {showReviewButton && (
              <Button
                onClick={handleReviewClick}
                isLoading={isLoading}
                className="w-[200px] bg-[#8B0000] text-white"
              >
                {status === NominationSubmissionStatus.SUBMITTED
                  ? "Start Review"
                  : "Continue Review"}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
      {isModalOpen && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          nomination={nomination}
          onStatusChange={handleStatusChange}
        />
      )}
    </>
  );
};

export default ReviewCard;
