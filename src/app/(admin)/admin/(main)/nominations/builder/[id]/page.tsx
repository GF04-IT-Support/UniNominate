import NominationFormBuilder from "@/components/pages/admin/nominations/NominationFormBuilder";
import { getNominationForm } from "@/services/nominationService";

export default async function NominationEditorPage({
  params,
}: {
  params: { id: string };
}) {
  const nomination = await getNominationForm(params.id);

  if (!nomination) {
    return <div>Nomination not found</div>;
  }

  return <NominationFormBuilder initialData={nomination} />;
}
