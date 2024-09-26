import { redirect } from "next/navigation";
import {
  getNominationForm,
  validateToken,
} from "@/services/public/nominationService";
import NominationForm from "@/components/pages/root/nomination-form/NominationForm";
import { toast } from "react-hot-toast";
import ErrorToaster from "@/components/ui/ErrorToaster";

export default async function NominationFormPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  try {
    const nomination = await validateToken(id);

    const formData = await getNominationForm(nomination.formId);

    return (
      <div className="mx-auto py-8">
        <NominationForm
          nominationId={nomination.id}
          formData={formData}
          submissionStatus={nomination.submissionStatus}
        />
      </div>
    );
  } catch (error) {
    console.error("Error loading nomination form:", error);
    <ErrorToaster error="Invalid form or token" />;
    redirect(`/?error=${encodeURIComponent("Invalid form or token")}`);
  }
}
