import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.css";
import { NominationSubmissionStatus } from "@prisma/client";
import { updateNominationStatus } from "@/services/admin/reviewService";
import { toast } from "react-hot-toast";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  nomination: any;
  onStatusChange: (status: NominationSubmissionStatus) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  nomination,
  onStatusChange,
}) => {
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const survey = new Model(nomination.form.formStructure);
  survey.data = nomination.submissionData;
  survey.mode = "display";

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      await updateNominationStatus(
        nomination.id,
        NominationSubmissionStatus.ACCEPTED
      );
      onStatusChange(NominationSubmissionStatus.ACCEPTED);
      toast.success("Nomination approved successfully");
      onClose();
    } catch (error) {
      console.error("Error approving nomination:", error);
      toast.error("Error approving nomination");
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async () => {
    setIsRejecting(true);
    try {
      await updateNominationStatus(
        nomination.id,
        NominationSubmissionStatus.REJECTED
      );
      onStatusChange(NominationSubmissionStatus.REJECTED);
      toast.success("Nomination rejected successfully");
      onClose();
    } catch (error) {
      console.error("Error rejecting nomination:", error);
      toast.error("Error rejecting nomination");
    } finally {
      setIsRejecting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      className="max-h-screen h-full overflow-y-auto"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="text-4xl font-bold text-[#8B0000] mx-auto">
          Nomination Review
        </ModalHeader>
        <ModalBody>
          <Survey model={survey} />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
          <Button
            color="success"
            onPress={handleApprove}
            isLoading={isApproving}
          >
            Approve
          </Button>
          <Button color="danger" onPress={handleReject} isLoading={isRejecting}>
            Reject
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReviewModal;
