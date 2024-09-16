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
import useSWR from "swr";
import { Nomination } from "@prisma/client";
import { getNominationsForForm } from "@/services/nominationService";

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

  const pages = Math.ceil(nominations?.length! / rowsPerPage || 1);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return nominations?.slice(start, end);
  }, [page, nominations]);

  const handleApprove = (id: string) => {
    // Implement approval logic
  };

  const handleReject = (id: string) => {
    // Implement rejection logic
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
          table: isLoading || isEmpty ? "min-h-[400px]" : "",
          th: "text-[#8B0000] font-bold text-sm rounded-none",
        }}
      >
        <TableHeader>
          <TableColumn key="nominatorName">Nominator</TableColumn>
          <TableColumn key="nominatorEmail">Email</TableColumn>
          <TableColumn key="status">Status</TableColumn>
          <TableColumn key="createdAt">Requested At</TableColumn>
          <TableColumn key="actions">Actions</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"No nominations requested."}
          loadingContent={<Spinner />}
          loadingState={loadingState}
          items={isEmpty ? [] : items}
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.nominatorName}</TableCell>
              <TableCell>{item.nominatorEmail}</TableCell>
              <TableCell>{item.requestStatus}</TableCell>
              <TableCell>
                {new Date(item.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  color="success"
                  onClick={() => handleApprove(item.id)}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  color="danger"
                  onClick={() => handleReject(item.id)}
                >
                  Reject
                </Button>
                <Button size="sm" onClick={() => handleSeeDetails(item)}>
                  See Details
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal
        isOpen={!!selectedNomination}
        onClose={() => setSelectedNomination(null)}
      >
        <ModalContent>
          <ModalHeader>Nomination Details</ModalHeader>
          <ModalBody>
            {selectedNomination && (
              <div>
                <p>Nominator: {selectedNomination.nominatorName}</p>
                <p>Email: {selectedNomination.nominatorEmail}</p>
                <p>Status: {selectedNomination.requestStatus}</p>
                <p>
                  Created At:{" "}
                  {new Date(selectedNomination.createdAt).toLocaleString()}
                </p>
                <p>
                  Submission Data:{" "}
                  {JSON.stringify(selectedNomination.submissionData, null, 2)}
                </p>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => setSelectedNomination(null)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NominationTable;
