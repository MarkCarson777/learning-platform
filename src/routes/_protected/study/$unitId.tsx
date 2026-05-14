/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/study/$unitId")({
  component: StudyPage,
});

function StudyPage() {
  const { unitId } = Route.useParams();

  return <div>Study: {unitId}</div>;
}
