import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/flashcards/$moduleId")({
  component: FlashcardsPage,
});

function FlashcardsPage() {
  const { moduleId } = Route.useParams();
  return <div>Flashcards: {moduleId}</div>;
}
