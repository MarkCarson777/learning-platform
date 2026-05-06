/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router";
import { useModules } from "../../../hooks/useModules";
import { ModuleCard } from "../../../components/chunk/ModuleCard";

export const Route = createFileRoute("/_protected/library/")({
  component: LibraryPage,
});

function LibraryPage() {
  const { data: modules, isLoading, error } = useModules();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  if (!modules) return <div>No modules found</div>;

  return (
    <>
      <h1>Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </>
  );
}
