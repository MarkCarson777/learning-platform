import { createFileRoute } from "@tanstack/react-router";
import { useModules } from "../../../hooks/useModules";

export const Route = createFileRoute("/_protected/library/")({
  component: LibraryPage,
});

function LibraryPage() {
  const { data: modules, isLoading } = useModules();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <h1>Library</h1>
      <pre>{JSON.stringify(modules, null, 2)}</pre>
    </>
  );
}
