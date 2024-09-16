import Nominations from "@/components/pages/admin/nominations/Nominations";
import { getAllNominations } from "@/services/nominationService";

export default async function NominationsPage() {
  const nominations = await getAllNominations();
  return <Nominations nominations={nominations} />;
}
