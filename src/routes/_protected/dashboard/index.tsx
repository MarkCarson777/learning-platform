/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../../../context/AuthContext";
import { useModules } from "../../../hooks/useModules";
import { ModuleCard } from "../../../components/chunk/ModuleCard";
import { groupModules } from "../../../lib/groupModules";

export const Route = createFileRoute("/_protected/dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useAuth();
  const { data: modules } = useModules();

  if (!user) return <div>Loading...</div>;

  if (!modules) return <div>Loading...</div>;

  return (
    <div>
      <div>
        <header>Dashboard</header>
      </div>
      <h1>Welcome back, {user.displayName}</h1>
      <p>Level 3 PT Diploma</p>
      <div className="grid grid-cols-2">
        <div>{groupModules(modules).length} Modules</div>
        <div>3 Lectures</div>
        <div>16 Sections</div>
        <div>59 Flashcards</div>
      </div>
      <h2>Modules & Lectures</h2>
      <div className="grid grid-cols-1">
        {groupModules(modules).map((group) => (
          <div key={group.groupId}>
            <h3>{group.groupId}</h3>
            {group.modules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
