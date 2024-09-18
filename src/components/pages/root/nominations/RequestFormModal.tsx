"use client";

import React from "react";
import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";
import RequestForm from "./RequestForm";

interface RequestFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  positionId: string | null;
}

const RequestFormModal: React.FC<RequestFormModalProps> = ({
  isOpen,
  onClose,
  positionId,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      classNames={{
        header: "bg-[#8B0000] text-white",
        body: "bg-white",
        footer: "bg-white",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Nomination Form Request
        </ModalHeader>
        <RequestForm onClose={onClose} positionId={positionId} />
      </ModalContent>
    </Modal>
  );
};

export default RequestFormModal;
