import {
  getNominationForms,
  getNominationsForReview,
} from "@/services/admin/reviewService";
import ReviewsPageClient from "@/components/pages/admin/reviews/ReviewsPageClient";

export default async function ReviewsPage() {
  const nominationForms = await getNominationForms();
  const initialNominations = await getNominationsForReview(
    nominationForms[0]?.id
  );


  return (
    <ReviewsPageClient
      initialNominationForms={nominationForms}
      initialNominations={initialNominations}
    />
  );
}
