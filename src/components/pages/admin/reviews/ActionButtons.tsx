import React from "react";
import { Button } from "@nextui-org/react";
import { NominationSubmissionStatus } from "@prisma/client";

interface ActionButtonsProps {
  onStatusChange: (status: NominationSubmissionStatus) => void;
  isApproving: boolean;
  isRejecting: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = React.memo(
  ({ onStatusChange, isApproving, isRejecting }) => {
    return (
      <>
        <Button
          color="success"
          onClick={() => onStatusChange(NominationSubmissionStatus.ACCEPTED)}
          isLoading={isApproving}
          // className="flex-shrink-0 w-[400px] mx-auto"
        >
          Approve
        </Button>
        <Button
          color="danger"
          onClick={() => onStatusChange(NominationSubmissionStatus.REJECTED)}
          isLoading={isRejecting}
          // className="flex-shrink-0 w-[400px] mx-auto"
        >
          Reject
        </Button>
      </>
    );
  }
);

export default ActionButtons;
