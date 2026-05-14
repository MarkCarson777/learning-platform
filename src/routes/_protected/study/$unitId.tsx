/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router";
import { useUnit } from "../../../hooks/useUnits";
import { Chunk } from "../../../components/chunk/Chunk";

export const Route = createFileRoute("/_protected/study/$unitId")({
  component: StudyPage,
});

function StudyPage() {
  const { unitId } = Route.useParams();
  const { data: unit } = useUnit(unitId);

  console.log("unit", unit);

  if (!unit) return <div>Loading...</div>;
  return (
    <div>
      {unit.chunks.map((chunk) => (
        <Chunk key={chunk.id} chunk={chunk} />
      ))}
    </div>
  );
}
