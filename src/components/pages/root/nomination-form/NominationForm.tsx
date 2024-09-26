"use client";

import React, { useEffect, useState } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.css";
import { saveNominationSubmission } from "@/services/nominationService";
import toast from "react-hot-toast";
import NominationStatus from "./NominationStatus";

interface NominationFormProps {
  nominationId: string;
  formData: any;
  submissionStatus: string;
}

const NominationForm: React.FC<NominationFormProps> = ({
  nominationId,
  formData,
  submissionStatus,
}) => {
  const [survey, setSurvey] = useState<Model | null>(null);

  useEffect(() => {
    if (submissionStatus === "NOT_SUBMITTED") {
      const newSurvey = new Model(formData.formStructure);
      const savedData = localStorage.getItem(`nomination_${nominationId}`);
      if (savedData) {
        newSurvey.data = JSON.parse(savedData);
      }
      newSurvey.onValueChanged.add((sender, options) => {
        localStorage.setItem(
          `nomination_${nominationId}`,
          JSON.stringify(sender.data)
        );
      });
      setSurvey(newSurvey);
    }
  }, [nominationId, formData, submissionStatus]);

  const onComplete = async (survey: any) => {
    try {
      const submissionData = {
        nominationId,
        submissionData: survey.data,
        submissionStatus: "SUBMITTED" as const,
      };

      await saveNominationSubmission(submissionData);
      localStorage.removeItem(`nomination_${nominationId}`);
      toast.success("Nomination submitted successfully");
    } catch (error) {
      console.error("Error saving survey results:", error);
      toast.error("Error saving survey results");
    }
  };

  if (submissionStatus !== "NOT_SUBMITTED") {
    return <NominationStatus status={submissionStatus} formData={formData} />;
  }

  return (
    <div className="nomination-form-container">
      {survey && <Survey model={survey} onComplete={onComplete} />}
    </div>
  );
};

export default NominationForm;
