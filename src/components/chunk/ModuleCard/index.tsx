import { Link } from "@tanstack/react-router";
import { useUnitsByModule } from "../../../hooks/useUnits";

export const ModuleCard = ({ module }) => {
  const { data: units } = useUnitsByModule(module.id);

  if (!units) return <div>Loading...</div>;

  return (
    <div className="border border-gray-200 rounded-md p-4">
      <h2 className="font-bold">{module.name}</h2>
      <div className="flex flex-col gap-2">
        {units.map((unit, index) => (
          <Link
            key={index}
            className="bg bg-gray-200 rounded-md p-4"
            to="/study/$unitId"
            params={{ unitId: unit.id }}
          >
            {unit.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
