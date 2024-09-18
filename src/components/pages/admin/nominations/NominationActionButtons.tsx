import React from "react";
import { Button, Chip } from "@nextui-org/react";
import { MdCheck, MdClose } from "react-icons/md";
import { NominationRequestStatus } from "@prisma/client";

interface NominationActionButtonsProps {
  id: string;
  requestStatus: string;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  isLoadingApprove: boolean;
  isLoadingReject: boolean;
}

const NominationActionButtons: React.FC<NominationActionButtonsProps> = ({
  id,
  requestStatus,
  onApprove,
  onReject,
  isLoadingApprove,
  isLoadingReject,
}) => {
  if (requestStatus === NominationRequestStatus.PENDING_APPROVAL) {
    return (
      <>
        <Button
          size="sm"
          color="success"
          onClick={() => onApprove(id)}
          startContent={<MdCheck size={16} />}
          isLoading={isLoadingApprove}
        >
          Approve
        </Button>
        <Button
          size="sm"
          color="danger"
          onClick={() => onReject(id)}
          startContent={<MdClose size={16} />}
          isLoading={isLoadingReject}
        >
          Reject
        </Button>
      </>
    );
  } else {
    return (
      <Chip color={requestStatus === "APPROVED" ? "success" : "danger"}>
        {requestStatus}
      </Chip>
    );
  }
};

export default NominationActionButtons;
