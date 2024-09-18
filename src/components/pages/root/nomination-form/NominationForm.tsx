"use client";

import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.css";

interface NominationFormProps {
  nominationId: string;
  formData: any;
}

const NominationForm: React.FC<NominationFormProps> = ({
  nominationId,
  formData,
}) => {
  const survey = new Model(formData.formStructure);

  const onComplete = (survey: any) => {
    console.log("Survey results:", survey.data);
    // Here you would typically send the survey results to your backend
    // For example: submitNominationForm(formId, survey.data);
  };

  return (
    <div className="nomination-form-container">
      <Survey model={survey} onComplete={onComplete} />
    </div>
  );
};

export default NominationForm;
