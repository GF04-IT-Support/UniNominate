"use client";

import React, { useState, useEffect, useRef } from "react";
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import {
  createNomination,
  updateNomination,
} from "@/services/admin/nominationService";
import { toast } from "react-hot-toast";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useNominationStore } from "@/store/useNominationStore";
import { Button, Spinner } from "@nextui-org/react";

interface NominationFormBuilderProps {
  id?: string;
  initialData?: any;
}

const NominationFormBuilder: React.FC<NominationFormBuilderProps> = ({
  id,
  initialData,
}) => {
  const router = useRouter();
  const params = useParams();
  const creatorRef = useRef<SurveyCreator | null>(null);
  const [creator, setCreator] = useState<SurveyCreator | null>(null);
  const { nomination, setNomination, resetNomination } = useNominationStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!creatorRef.current) {
      const newCreator = new SurveyCreator({
        showLogicTab: true,
        showTranslationTab: true,
        isAutoSave: true,
      });

      const initializeCreator = () => {
        if (nomination.formStructure && params.id === nomination.id) {
          console.log("Setting form structure from nomination store");
          newCreator.JSON = nomination.formStructure;
        } else if (initialData) {
          console.log("Setting initial data");
          newCreator.JSON = initialData.formStructure;
          resetNomination();
        } else {
          console.log("Resetting nomination");
          resetNomination();
        }

        newCreator.saveSurveyFunc = (
          saveNo: number,
          callback: (no: number, isSuccess: boolean) => void
        ) => {
          const formData = {
            id: (params.id as string) || "temp",
            name: newCreator.survey.title || "Untitled Form",
            description: newCreator.survey.description || "",
            formStructure: newCreator.JSON,
          };
          setNomination(formData);
          callback(saveNo, true);
        };

        creatorRef.current = newCreator;
        setCreator(newCreator);
      };

      // Wait for nomination data to be available
      if (nomination.id === undefined) {
        const checkNomination = setInterval(() => {
          if (nomination.id !== undefined) {
            clearInterval(checkNomination);
            initializeCreator();
          }
        }, 100);
      } else {
        initializeCreator();
      }
    }
  }, [params.id, initialData, setNomination, resetNomination, nomination]);

  const handleSave = async () => {
    if (!creator) return;
    setIsLoading(true);
    try {
      const formData = {
        name: creator.survey.title || "Untitled Form",
        description: creator.survey.description || "",
        formStructure: creator.JSON,
      };

      let savedNomination;
      if (params.id) {
        await updateNomination(params.id as string, formData);
        savedNomination = { id: params.id as string, ...formData };
        toast.success("Nomination form updated successfully");
      } else {
        savedNomination = await createNomination(formData);
        toast.success("Nomination form created successfully");
        router.push(`/admin/nominations/builder/${savedNomination.id}`);
      }

      // Update the nomination store with the saved data and new ID
      setNomination(savedNomination);
    } catch (error) {
      console.error("Error saving nomination form:", error);
      toast.error("Failed to save nomination form");
    } finally {
      setIsLoading(false);
    }
  };

  if (!creator) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner color="danger" />
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col pb-4">
      <div className="p-4 mb-2 flex justify-end">
        <Button
          onClick={handleSave}
          radius="sm"
          className="bg-[#8B0000] text-white w-[200px]"
          isLoading={isLoading}
        >
          Save
        </Button>
      </div>
      <div className="flex-grow">
        <SurveyCreatorComponent creator={creator} />
      </div>
    </div>
  );
};

export default NominationFormBuilder;
