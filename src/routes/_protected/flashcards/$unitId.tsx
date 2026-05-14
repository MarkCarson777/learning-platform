/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/flashcards/$unitId")({
  component: FlashcardsPage,
});

function FlashcardsPage() {
  const { unitId } = Route.useParams();
  return <div>Flashcards: {unitId}</div>;
}
