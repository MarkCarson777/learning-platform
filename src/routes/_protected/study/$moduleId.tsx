import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/study/$moduleId")({
  component: StudyPage,
});

function StudyPage() {
  const { moduleId } = Route.useParams();

  return <div>Study: {moduleId}</div>;
}
