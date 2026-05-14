/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../../../context/AuthContext";
import { useModules } from "../../../hooks/useModules";
import { ModuleCard } from "../../../components/chunk/ModuleCard";
import { DashboardCard } from "../../../components/chunk/DashboardCard";
import { useUnits } from "../../../hooks/useUnits";

export const Route = createFileRoute("/_protected/dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useAuth();
  const { data: modules } = useModules();
  const { data: units } = useUnits();

  if (!user) return <div>Loading...</div>;

  if (!modules) return <div>Loading...</div>;

  if (!units) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full p-4 bg-gray-100">
        <header>Dashboard</header>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-xl font-bold">Welcome back, {user.displayName}</h1>
        <p>Level 3 PT Diploma</p>
        <div className="grid grid-cols-4 gap-4">
          <DashboardCard count={modules.length} label="Modules" />
          <DashboardCard count={units.length} label="Lectures" />
          <DashboardCard count={16} label="Sections" />
          <DashboardCard count={59} label="Flashcards" />
        </div>
        <h2 className="text-lg font-bold">Course Content</h2>
        <div className="grid grid-cols-4 gap-4">
          {modules.map((module, index) => (
            <ModuleCard key={index} module={module} />
          ))}
        </div>
      </div>
    </div>
  );
}
