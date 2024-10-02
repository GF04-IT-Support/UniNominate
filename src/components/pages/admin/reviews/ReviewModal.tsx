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
import {
  Nomination,
  NominationForm,
  NominationSubmissionStatus,
} from "@prisma/client";
import { updateNominationStatus } from "@/services/admin/reviewService";
import { toast } from "react-hot-toast";
import CommentForm from "./CommentForm";
import ActionButtons from "./ActionButtons";
import * as SurveyPDF from "survey-pdf";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  nomination: Nomination & {
    form: NominationForm;
  };
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
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [pendingStatus, setPendingStatus] =
    useState<NominationSubmissionStatus | null>(null);

  const survey = new Model(nomination.form.formStructure);
  survey.data = nomination.submissionData;
  survey.mode = "display";

  const handleStatusChange = async (status: NominationSubmissionStatus) => {
    setPendingStatus(status);
    setShowCommentForm(true);
  };

  const handleSubmitComment = async (data: { comment: string }) => {
    if (!pendingStatus) return;

    setShowCommentForm(false);

    const isApproving = pendingStatus === NominationSubmissionStatus.ACCEPTED;
    const setLoading = isApproving ? setIsApproving : setIsRejecting;
    setLoading(true);

    toast.loading(
      isApproving ? "Approving nomination..." : "Rejecting nomination..."
    );

    try {
      await updateNominationStatus(nomination.id, pendingStatus, data.comment);
      onStatusChange(pendingStatus);
      toast.dismiss();
      toast.success(
        `Nomination ${isApproving ? "approved" : "rejected"} successfully`
      );
      onClose();
    } catch (error) {
      console.error(
        `Error ${isApproving ? "approving" : "rejecting"} nomination:`,
        error
      );
      toast.error(
        `Error ${isApproving ? "approving" : "rejecting"} nomination`
      );
      toast.dismiss();
    } finally {
      setLoading(false);
      setPendingStatus(null);
    }
  };

  const handlePrintPDF = async () => {
    const pdfDocOptions = {
      fontSize: 12,
      margins: {
        left: 10,
        right: 10,
        top: 10,
        bot: 10,
      },
      compress: true,
      textRenderingMode: "fill-then-stroke",
    };
  
    // Function to convert base64 to Blob
    const base64toBlob = (base64: string, contentType = '') => {
      const byteCharacters = atob(base64.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: contentType });
    };
  
    // Clone the submission data to avoid modifying the original
    const processedData = JSON.parse(JSON.stringify(nomination.submissionData));
  
    // Recursively process the data to convert base64 to Blob
    const processObject = async (obj: any) => {
      for (const key in obj) {
        if (typeof obj[key] === 'string' && obj[key].startsWith('data:')) {
          // This looks like a base64 encoded file
          const contentType = obj[key].split(';')[0].split(':')[1];
          const blob = base64toBlob(obj[key], contentType);
          obj[key] = URL.createObjectURL(blob);
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          await processObject(obj[key]);
        }
      }
    };
  
    await processObject(processedData);
  
    const surveyPDF = new SurveyPDF.SurveyPDF(
      nomination.form.formStructure,
      pdfDocOptions
    );
    surveyPDF.data = processedData;
  
    surveyPDF.save(`${nomination.nominatorName}_nomination.pdf`);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        className="max-h-screen h-full overflow-y-auto"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className="text-4xl font-bold w-full text-[#8B0000] mx-auto flex justify-between items-center">
            <span className="flex-grow text-center">Nomination Review</span>
            <Button
              color="primary"
              onClick={handlePrintPDF}
              className="bg-[#8B0000] text-white mr-6 w-40"
            >
              Download
            </Button>
          </ModalHeader>
          <ModalBody>
            <Survey model={survey} />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onClick={onClose}>
              Close
            </Button>
            <ActionButtons
              key={`${isApproving}-${isRejecting}`}
              onStatusChange={handleStatusChange}
              isApproving={isApproving}
              isRejecting={isRejecting}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
      {showCommentForm && (
        <Modal
          isOpen={showCommentForm}
          onClose={() => setShowCommentForm(false)}
        >
          <ModalContent>
            <ModalHeader className="font-bold text-[#8B0000] mx-auto">
              {pendingStatus === NominationSubmissionStatus.ACCEPTED
                ? "Approve Review"
                : "Reject Review"}
            </ModalHeader>
            <ModalBody>
              <CommentForm
                onSubmit={handleSubmitComment}
                onCancel={() => setShowCommentForm(false)}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default ReviewModal;
