/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../../../context/AuthContext";
import { useModules } from "../../../hooks/useModules";
import { ModuleCard } from "../../../components/chunk/ModuleCard";
import { groupModules } from "../../../lib/groupModules";
import { DashboardCard } from "../../../components/chunk/DashboardCard";

export const Route = createFileRoute("/_protected/dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useAuth();
  const { data: modules } = useModules();

  if (!user) return <div>Loading...</div>;

  if (!modules) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full p-4 bg-gray-100">
        <header>Dashboard</header>
      </div>
      <h1 className="text-xl font-bold">Welcome back, {user.displayName}</h1>
      <p>Level 3 PT Diploma</p>
      <div className="grid grid-cols-4 gap-4">
        <DashboardCard count={groupModules(modules).length} label="Modules" />
        <DashboardCard count={3} label="Lectures" />
        <DashboardCard count={16} label="Sections" />
        <DashboardCard count={59} label="Flashcards" />
      </div>
      <h2 className="text-lg font-bold">Course Content</h2>
      <div className="grid grid-cols-4 gap-4">
        {groupModules(modules).map((group, index) => (
          <ModuleCard key={index} group={group} />
        ))}
      </div>
    </div>
  );
}
