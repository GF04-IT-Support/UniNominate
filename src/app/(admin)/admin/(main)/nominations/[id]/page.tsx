export default function NominationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <div>Nomination Detail Page: {params.id}</div>;
}
