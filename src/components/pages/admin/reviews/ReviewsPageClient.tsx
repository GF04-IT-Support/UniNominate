"use client";

import React, { useState, useEffect } from "react";
import { Select, SelectItem, Spinner } from "@nextui-org/react";
import useSWR from "swr";
import { getNominationsForReview } from "@/services/admin/reviewService";
import ReviewCardList from "./ReviewCardList";
import { Nomination, NominationForm } from "@prisma/client";

interface ReviewsPageClientProps {
  initialNominationForms: { id: string; name: string }[];
  initialNominations: (Nomination & {
    form: NominationForm;
  })[];
}

const ReviewsPageClient: React.FC<ReviewsPageClientProps> = ({
  initialNominationForms,
  initialNominations,
}) => {
  const [selectedFormId, setSelectedFormId] = useState(
    initialNominationForms[1]?.id
  );

  const { data: nominations, isLoading } = useSWR(
    selectedFormId ? `nominations-${selectedFormId}` : null,
    () => getNominationsForReview(selectedFormId!),
    { fallbackData: initialNominations }
  );

  useEffect(() => {
    if (initialNominationForms.length > 0 && !selectedFormId) {
      setSelectedFormId(initialNominationForms[0].id);
    }
  }, [initialNominationForms, selectedFormId]);

  return (
    <div>
      <Select
        label="Select Nomination Form"
        className="mb-6"
        selectedKeys={[selectedFormId]}
        onChange={(e) => setSelectedFormId(e.target.value)}
        isDisabled={initialNominationForms.length === 0}
        fullWidth
        disallowEmptySelection
        radius="sm"
      >
        {initialNominationForms.map((form) => (
          <SelectItem key={form.id} value={form.id}>
            {form.name}
          </SelectItem>
        ))}
      </Select>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size="md" color="danger" />
        </div>
      ) : (
        <ReviewCardList nominations={nominations} />
      )}
    </div>
  );
};

export default ReviewsPageClient;
