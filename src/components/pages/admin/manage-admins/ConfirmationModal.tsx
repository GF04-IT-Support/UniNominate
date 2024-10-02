"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading: boolean;
}

const ActionButton = ({
  onPress,
  isLoading,
  children,
  isCancel,
}: {
  onPress: () => void;
  isLoading: boolean;
  isCancel?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Button
      color="danger"
      onPress={onPress}
      variant={isCancel ? "light" : "solid"}
      className={` ${!isCancel ? "bg-[#8B0000] text-white" : ""}`}
      isLoading={!isCancel ? isLoading : false}
      isDisabled={isLoading}
    >
      {children}
    </Button>
  );
};
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isLoading,
}: ConfirmationModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="mx-auto text-[#8B0000] font-bold">
          {title}
        </ModalHeader>
        <ModalBody>{message}</ModalBody>
        <ModalFooter>
          <ActionButton onPress={onClose} isLoading={isLoading} isCancel>
            Cancel
          </ActionButton>
          <ActionButton onPress={onConfirm} isLoading={isLoading}>
            Confirm
          </ActionButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
