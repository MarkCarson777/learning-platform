import { Link } from "@tanstack/react-router";
import type { Module } from "../../../types/content";

type ModuleCardProps = {
  module: Module;
};

export const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  return (
    <Link to="/study/$moduleId" params={{ moduleId: module.id }}>
      <h2>{module.module}</h2>
    </Link>
  );
};
