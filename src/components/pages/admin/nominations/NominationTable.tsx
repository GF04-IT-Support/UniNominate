"use client";

import React, { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Pagination,
  Spinner,
} from "@nextui-org/react";
import useSWR, { mutate } from "swr";
import { Nomination, NominationRequestStatus } from "@prisma/client";
import {
  approveNominationRequest,
  getNominationsForForm,
  rejectNominationRequest,
} from "@/services/admin/nominationService";
import { MdCheck, MdClose, MdVisibility } from "react-icons/md";
import { FaUser, FaClock, FaClipboard, FaInfoCircle } from "react-icons/fa";
import { Chip } from "@nextui-org/react";
import toast from "react-hot-toast";
import NominationActionButtons from "./NominationActionButtons";

interface NominationTableProps {
  formId: string;
}

const fetcher = (formId: string) => getNominationsForForm(formId);

const NominationTable: React.FC<NominationTableProps> = ({ formId }) => {
  const [selectedNomination, setSelectedNomination] =
    useState<Nomination | null>(null);
  const { data: nominations, error, isLoading } = useSWR(formId, fetcher);
  const rowsPerPage = 10;
  const [page, setPage] = useState(1);
  const [actionLoading, setActionLoading] = useState<
    Record<string, { approve: boolean; reject: boolean }>
  >({});

  const pages = Math.ceil(nominations?.length! / rowsPerPage || 1);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return nominations?.slice(start, end);
  }, [page, nominations]);

  const handleApprove = async (id: string) => {
    try {
      setActionLoading((prev) => ({
        ...prev,
        [id]: { ...prev[id], approve: true },
      }));
      await approveNominationRequest(id);
      toast.success("Nomination request approved successfully");
      mutate(formId);
    } catch (error) {
      console.error("Error approving nomination:", error);
      toast.error("Failed to approve nomination request");
    } finally {
      setActionLoading((prev) => ({
        ...prev,
        [id]: { ...prev[id], approve: false },
      }));
      setSelectedNomination(null);
    }
  };

  const handleReject = async (id: string) => {
    try {
      setActionLoading((prev) => ({
        ...prev,
        [id]: { ...prev[id], reject: true },
      }));
      await rejectNominationRequest(id);
      toast.success("Nomination request rejected successfully");
      mutate(formId);
    } catch (error) {
      console.error("Error rejecting nomination:", error);
      toast.error("Failed to reject nomination request");
    } finally {
      setActionLoading((prev) => ({
        ...prev,
        [id]: { ...prev[id], reject: false },
      }));
      setSelectedNomination(null);
    }
  };


  const handleSeeDetails = (nomination: Nomination) => {
    setSelectedNomination(nomination);
  };

  const isEmpty = !nominations || nominations?.length === 0;
  const loadingState = isLoading ? "loading" : "idle";

  return (
    <>
      <Table
        aria-label="Nominations table"
        radius="none"
        bottomContent={
          pages > 1 && (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          )
        }
        classNames={{
          table: isLoading || isEmpty ? "min-h-[200px]" : "",
          th: "text-[#8B0000] font-bold text-sm rounded-none",
        }}
      >
        <TableHeader>
          <TableColumn key="nominatorName">Nominator</TableColumn>
          <TableColumn key="nominatorEmail">Email</TableColumn>
          <TableColumn key="createdAt">Request Time</TableColumn>
          <TableColumn key="actions">Actions</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"No nominations requested."}
          loadingContent={<Spinner color="danger" />}
          loadingState={loadingState}
          items={isEmpty ? [] : items}
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.nominatorName}</TableCell>
              <TableCell>{item.nominatorEmail}</TableCell>
              <TableCell>
                {new Date(item.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="flex gap-2">
                <NominationActionButtons
                  id={item.id}
                  requestStatus={item.requestStatus}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  isLoadingApprove={actionLoading[item.id]?.approve}
                  isLoadingReject={actionLoading[item.id]?.reject}
                />
                <Button
                  size="sm"
                  onClick={() => handleSeeDetails(item)}
                  isIconOnly
                  startContent={<MdVisibility size={20} />}
                  variant="light"
                  className="text-[#8B0000]"
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal
        isOpen={!!selectedNomination}
        onClose={() => setSelectedNomination(null)}
        size="lg"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-[#8B0000]">
                  Nomination Request
                </h2>
              </ModalHeader>
              <ModalBody>
                {selectedNomination && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#8B0000] rounded-full p-3">
                        <FaUser className="text-white text-2xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">
                          {selectedNomination.nominatorName}
                        </h3>
                        <p className="text-gray-600">
                          {selectedNomination.nominatorEmail}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-md font-semibold mb-2 flex items-center gap-2">
                        <FaClock className="text-[#8B0000]" />
                        Request Time
                      </h4>
                      <p>
                        {new Intl.DateTimeFormat("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(selectedNomination.createdAt))}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-md font-semibold mb-2 flex items-center gap-2">
                        <FaClipboard className="text-[#8B0000]" />
                        Reason for Nomination
                      </h4>
                      <p className="bg-gray-100 p-3 rounded-md">
                        {selectedNomination.reason}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-md font-semibold mb-2 flex items-center gap-2">
                        <FaInfoCircle className="text-[#8B0000]" />
                        Status
                      </h4>
                      <Chip
                        color={
                          selectedNomination.requestStatus ===
                          NominationRequestStatus.APPROVED
                            ? "success"
                            : "danger"
                        }
                      >
                        {selectedNomination.requestStatus}
                      </Chip>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                {selectedNomination &&
                  selectedNomination.requestStatus ===
                    NominationRequestStatus.PENDING_APPROVAL && (
                    <NominationActionButtons
                      id={selectedNomination.id}
                      requestStatus={selectedNomination.requestStatus}
                      onApprove={(id) => {
                        handleApprove(id);
                      }}
                      onReject={(id) => {
                        handleReject(id);
                      }}
                      isLoadingApprove={
                        actionLoading[selectedNomination.id]?.approve
                      }
                      isLoadingReject={
                        actionLoading[selectedNomination.id]?.reject
                      }
                    />
                  )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default NominationTable;
