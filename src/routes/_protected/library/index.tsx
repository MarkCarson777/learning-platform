import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/library/")({
  component: () => <div>Library</div>,
});
