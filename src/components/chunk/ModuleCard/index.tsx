import { Link } from "@tanstack/react-router";

export const ModuleCard = ({ group }) => {
  console.log("group", group);

  const ModuleNameMap = {
    "course-introduction": "Course Introduction",
    "the-foundations": "The Foundations",
  };

  return (
    <div className="border border-gray-200 rounded-md p-4">
      <h2 className="text-red-500">{ModuleNameMap[group.groupId]}</h2>
      <div className="flex flex-col gap-2">
        {group.modules.map((module) => (
          <Link
            className="bg bg-gray-200 rounded-md p-4"
            key={module.id}
            to="/study/$moduleId"
            params={{ moduleId: module.id }}
          >
            {module.module}
          </Link>
        ))}
      </div>
    </div>
  );
};
