import { Link } from "@tanstack/react-router";
import type { Module } from "../../../types/content";

type ModuleCardProps = {
  module: Module;
};

export const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  return (
    <Link to="/study/$moduleId" params={{ moduleId: module.id }}>
      <div>
        <span>{module.type}</span>
        <span>{module.chunks.length} chunks</span>
      </div>
      <h2>{module.module}</h2>
      <p>{module.course}</p>
    </Link>
  );
};
